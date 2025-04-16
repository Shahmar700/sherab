<template>
    <div :class="['custom-dropdown', className, { disabled }]" ref="dropdownRef">
      <div 
        :class="['dropdown-header', { open: isOpen }]" 
        @click="handleToggle"
      >
        <span class="dropdown-value">{{ getDisplayValue() }}</span>
        <span class="dropdown-arrow">▼</span>
      </div>
  
      <div v-if="isOpen && !disabled" class="dropdown-menu">
        <div class="dropdown-search">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Axtarış..."
            class="search-input"
          />
        </div>
        <div 
          v-for="option in filteredOptions" 
          :key="option.value" 
          :class="['dropdown-item', { selected: isSelected(option) }]"
          @click="() => handleSelect(option)"
        >
          <input
            v-if="isMulti"
            type="checkbox"
            :checked="isSelected(option)"
            class="checkbox-input"
            @change="() => {}"
          />
          <span class="item-label">{{ option.label }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
  
  export default {
    name: "CustomDropdown",
    props: {
      options: {
        type: Array,
        default: () => [],
      },
      value: [String, Array],
      onChange: Function,
      placeholder: {
        type: String,
        default: "Seçin",
      },
      name: String,
      isMulti: {
        type: Boolean,
        default: false,
      },
      className: {
        type: String,
        default: "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const isOpen = ref(false);
      const searchTerm = ref("");
      const dropdownRef = ref(null);
  
      const handleToggle = () => {
        if (!props.disabled) {
          isOpen.value = !isOpen.value;
        }
      };
  
      const handleSelect = (option) => {
        if (props.disabled) return;
        if (props.isMulti) {
          const currentValue = props.value || [];
          const isSelected = currentValue.includes(option.value);
          const newValue = isSelected
            ? currentValue.filter((v) => v !== option.value)
            : [...currentValue, option.value];
          props.onChange({ target: { name: props.name, value: newValue } });
        } else {
          props.onChange({ target: { name: props.name, value: option.value } });
          isOpen.value = false;
        }
      };
  
      const getDisplayValue = () => {
        if (!props.value) return props.placeholder;
        if (props.isMulti) {
          const selectedOptions = props.options.filter((opt) =>
            props.value.includes(opt.value)
          );
          return selectedOptions.map((opt) => opt.label).join(", ");
        }
        const selectedOption = props.options.find(
          (opt) => opt.value === props.value
        );
        return selectedOption ? selectedOption.label : props.placeholder;
      };
  
      const isSelected = (option) => {
        if (props.isMulti) {
          return props.value && props.value.includes(option.value);
        }
        return props.value === option.value;
      };
  
      const filteredOptions = computed(() =>
        props.options.filter((option) =>
          option.label
            ? option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
            : false
        )
      );
  
      const handleClickOutside = (event) => {
        if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
          isOpen.value = false;
        }
      };
  
      onMounted(() => {
        document.addEventListener("mousedown", handleClickOutside);
      });
  
      onBeforeUnmount(() => {
        document.removeEventListener("mousedown", handleClickOutside);
      });
  
      return {
        isOpen,
        searchTerm,
        dropdownRef,
        handleToggle,
        handleSelect,
        getDisplayValue,
        isSelected,
        filteredOptions,
      };
    },
  };
  </script>
  
<style scoped>

.custom-dropdown {
  position: relative;
  width: 100%;

}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #D4DCE8;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-header:hover {
  border-color: #999;
}

.dropdown-header.open {
  /* border-color: #007bff; */
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.dropdown-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}

.dropdown-arrow {
  margin-left: 8px;
  font-size: 12px;
  color: #666;
  transition: transform 0.2s ease;
}

.dropdown-header.open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.selected {
  background-color: #e9ecef;
}

.checkbox-input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.item-label {
  flex: 1;
  color: #333;
  font-size: 14px;
}

/* Scrollbar styles */
.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #555;
} 

.dropdown-search {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.search-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}
  </style>