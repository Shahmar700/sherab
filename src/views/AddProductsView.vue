<template>
  <div class="mt-5 pb-5" >
    <h3 class="mb-4 pageHeading">Məhsul əlavə et</h3>
    <form data-aos="fade-up">
      <!-- Ad -->
      <div class="mb-3" data-aos="fade-up">
        <label for="name" class="form-label">Ad</label>
        <input type="text" class="form-control" id="name" placeholder="Məhsulun adı" />
      </div>

      <!-- Vahid -->
      <div class="mb-3">
        <label for="unit" class="form-label">Vahid</label>
        <select class="form-select" id="unit">
          <option value="ədəd">Ədəd</option>
          <option value="qutu">Qutu (24)</option>
        </select>
      </div>

      <!-- Say -->
      <div class="mb-3">
        <label for="quantity" class="form-label">Say</label>
        <input type="number" class="form-control" id="quantity" placeholder="Məhsulun sayı" />
      </div>

      <!-- Alış Qiyməti -->
      <div class="mb-3">
        <label for="price" class="form-label">Alış Qiyməti</label>
        <input type="number" class="form-control" id="price" placeholder="Məhsulun alış qiyməti" />
      </div>

      <!-- Satış Qiyməti -->
      <div class="mb-3">
        <label for="price" class="form-label">Satış Qiyməti</label>
        <input type="number" class="form-control" id="price" placeholder="Məhsulun satış qiyməti" />
      </div>

      <!-- Şəkil Modalı -->
      <Modal :isOpen="isImageModalOpen" @close="closeImageModal">
        <div class="image-modal-container position-relative">
          <img :src="selectedImage" alt="Qaimə Şəkli" class="preview-image" />
          
          <!-- Sol ox -->
          <button 
            v-if="invoiceFiles.length > 1" 
            class="nav-btn left-btn" 
            @click="prevImage"
          >
            <i class="ri-arrow-left-s-line"></i>
          </button>
          
          <!-- Sağ ox -->
          <button 
            v-if="invoiceFiles.length > 1" 
            class="nav-btn right-btn" 
            @click="nextImage"
          >
            <i class="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </Modal>

      <!-- İstifadəçi -->
      <div class="mb-3">
        <label for="user" class="form-label">İstifadəçi</label>
        <input type="text" class="form-control" id="user" placeholder="Aktiv istifadəçi" disabled />
      </div>

      <!-- Yadda saxla düyməsi -->
      <button type="submit" class="customBtn mt-4 pageSubmitBtn">Yadda saxla</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/Modal.vue'; // Modal komponentini import et
import { useRoute } from 'vue-router'; // Vue Router-dan useRoute-i import et

// Şəkil Modalı ilə Bağlı JavaScript Kodları
const isImageModalOpen = ref(false); // Şəkil modalının açıq olub-olmaması
const selectedImage = ref(''); // Seçilmiş şəkil
const invoiceFiles = ref([]); // Şəkil faylları
const currentImageIndex = ref(0); // Cari şəkilin indeksi

function showImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = e.target.result;
    isImageModalOpen.value = true;
    // Cari şəkilin indeksini tap
    currentImageIndex.value = invoiceFiles.value.findIndex((f) => f.file === file);
  };
  reader.readAsDataURL(file);
}

function closeImageModal() {
  isImageModalOpen.value = false;
}

function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + invoiceFiles.value.length) % invoiceFiles.value.length;
  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = e.target.result;
  };
  reader.readAsDataURL(invoiceFiles.value[currentImageIndex.value].file);
}

function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % invoiceFiles.value.length;
  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = e.target.result;
  };
  reader.readAsDataURL(invoiceFiles.value[currentImageIndex.value].file);
}

</script>

<style scoped>
/* Şəkil Modalı üçün CSS */
.image-modal-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  height: auto;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.nav-btn i {
  font-size: 24px;
  color: #333;
}

.left-btn {
  left: 5px;
}

.right-btn {
  right: 5px;
}

@media screen and (max-width: 768px) {
  .nav-btn {
    width: 30px;
    height: 30px;
  }
  
  .nav-btn i {
    font-size: 18px;
  }
}
</style>