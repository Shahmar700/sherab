<template>
    <div class="modal-backdrop" v-if="isOpen" @click="handleBackdropClick">
      <div class="modal-content" @click.stop>
        <div class="btnDiv">
          <svg xmlns="http://www.w3.org/2000/svg" @click="closeModal" width="27" height="27" viewBox="0 0 24 24" fill="rgba(128,0,32,1)">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
          </svg>
        </div>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    isOpen: Boolean,
  })
  
  const emit = defineEmits(['close'])
  
  function closeModal() {
    emit('close')
  }
  
  function handleBackdropClick() {
    closeModal()
  }
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
  }
  
  
  @media (max-width: 768px) {
  .modal-content {
      width: 90%; 
      max-width: 500px;
      padding: 15px; 
    }
  }
  @media (max-width: 375px) {
  .modal-content {
      width: 95%; 
      max-width: 340px;
      padding: 10px;
    }
  }
  @media (max-width: 375px) {
  .modal-content {
      width: 95%; 
      max-width: 340px;
      padding: 10px;
    }
  }
  @media (max-width: 320px) {
  .modal-content {
      width: 95%; 
      max-width: 300px;
      padding: 10px;
    }
  }


  .btnDiv {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  
  .btnDiv svg {
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .btnDiv svg:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .modal-content .btnDiv {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 10;
      }
    .modal-content .btnDiv svg{
      background-color: lightgray;
      border-radius: 50%;
    }
  }
  </style>