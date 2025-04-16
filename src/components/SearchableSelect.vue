<template>
  <div class="dropdown w-100 me-2">
    <button 
      class="form-select dropdown-toggle text-start" 
      type="button" 
      :id="id" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
    >
      <slot name="selected" :option="selectedOption">
        {{ selectedOption ? selectedOption.name : placeholder }}
      </slot>
    </button>
    <ul class="dropdown-menu w-100" :aria-labelledby="id">
      <li class="px-2">
        <input 
          type="text" 
          class="form-control mb-2" 
          v-model="searchTerm" 
          :placeholder="searchPlaceholder"
          @click.stop
        >
      </li>
      <li v-for="option in filteredOptions" :key="option.value">
        <a 
          class="dropdown-item" 
          href="#" 
          @click.prevent="selectOption(option)"
        >
          <slot name="option" :option="option">
            {{ option.name }}
          </slot>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: Object,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Seçin'
  },
  searchPlaceholder: {
    type: String,
    default: 'Axtarış...'
  },
  id: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const searchTerm = ref('');
const selectedOption = computed(() => props.modelValue);
const dropdown = ref(null);

onMounted(() => {
  // Bootstrap dropdown instance-ını yarat
  dropdown.value = new bootstrap.Dropdown(document.getElementById(props.id));
});

const filteredOptions = computed(() => {
  if (!searchTerm.value) return props.options;
  const searchTermLower = searchTerm.value.toLowerCase();
  return props.options.filter(option => 
    option.name.toLowerCase().includes(searchTermLower)
  );
});

function selectOption(option) {
  emit('update:modelValue', option);
  searchTerm.value = '';
  // Dropdown-u bağla
  dropdown.value.hide();
}
</script>

<style scoped>
/* Remove the default dropdown arrow */
.dropdown-toggle::after {
  display: none;
}

/* Add custom dropdown arrow */
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  padding-right: 2.25rem;
}

.form-select:focus {
  border-color: #800020;
  box-shadow: 0 0 0 0.25rem rgba(128, 0, 32, 0.25);
  outline: none;
}
</style> 