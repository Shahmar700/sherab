<template>
  <div class="mt-5 pb-5">
    <h3 class="mb-4 pageHeading">Qəbz əlavə et</h3>
    <form data-aos="fade-up">
      <!-- Şirkət -->
      <!-- <div class="mb-3">
        <label for="company" class="form-label">Şirkət</label>
        <div class="d-flex align-items-center">
          <SearchableSelect
            :options="companies"
            v-model="selectedCompany"
            placeholder="Şirkət seçin"
            search-placeholder="Axtarış..."
            id="companyDropdown"
          />
          <button type="button" class="btn plus" @click="openModal('organization')">+</button>
        </div>
      </div> -->

      <!-- Məhsul -->
      <div class="mb-3">
        <label for="product" class="form-label">Məhsul</label>
        <div class="d-flex align-items-center">
          <SearchableSelect
            :options="products"
            v-model="selectedProduct"
            placeholder="Məhsul seçin"
            search-placeholder="Axtarış..."
            id="productDropdown"
          />
          <button type="button" class="btn plus" @click="openModal('product')">+</button>
        </div>
      </div>

      <!-- Data -->
      <!-- <div class="mb-3">
        <label for="date" class="form-label">Tarix</label>
        <input type="date" class="form-control" id="date" v-model="todayDate" />
      </div> -->

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

      <!-- <label for="quantity" class="form-label">Endirim</label> -->
      <div class="mb-3">
        <label for="quantity" class="form-label">Endirim</label>
        <input type="number" class="form-control" id="quantity" placeholder="%" />
      </div>

      <!-- Qaimə -->
      <!-- <div class="mb-3">
        <label class="form-label">Qaimə</label>
        <div class="d-flex flex-column align-items-start border p-2 rounded">
          <button type="button" class="btn customBtn me-2" @click="showUploadOptions">Qaimə əlavə et</button>
          <input type="file" ref="invoiceInput" accept="image/*" multiple style="display: none" @change="handleInvoiceUpload" />
          <input type="file" ref="cameraInput" accept="image/*" capture="environment" style="display: none" @change="handleInvoiceUpload" />
          
          <div v-if="showOptions" class="upload-options mt-2 mb-2">
            <button type="button" class="btn btn-outline-primary me-2" @click="openCamera">Kamera ilə çək</button>
            <button type="button" class="btn btn-outline-secondary" @click="openGallery">Qalereyadan seç</button>
          </div>
          
          <div v-if="invoiceFiles.length > 0" class="uploaded-file-container p-2 rounded mt-2 w-100">
            <div class="header d-flex align-items-cente my-3 border-bottom border-light" @click="toggleFileList">
              <h6 class="mb-0 text-primary">Qaimə şəkillərinə bax</h6>
              <i class="ri-arrow-down-double-line text-primary"></i>
            </div>

            <div
                class="file-list"
                :class="{ open: isFileListOpen }"
              >
                <div v-for="(file, index) in invoiceFiles" :key="index" class="d-flex align-items-center mb-2">
                  <span>{{ file.name }}</span>
                  <button type="button" class="showImgBtn" @click="showImage(file.file)">
                    <i class="ri-eye-line"></i>
                  </button>
                  <button type="button" class="delImgBtn" @click="deleteImage(index)">
                    <i class="ri-delete-bin-6-line" style="color: red; text-decoration: none;"></i>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div> -->

      <!-- İmza -->
      <div>
        <!-- <div class="mb-3">
          <label class="form-label">İmza</label>
          <button type="button" class="btn customBtn mb-2" @click="openModal('signature')">İmza əlavə et</button>
        </div> -->
        
        <!-- Çəkilən İmzanın Göstərilməsi -->
        <div v-show="savedSignature" class="mt-3">
          <div class="d-flex align-items-center mb-2">
            <button type="button" class="delSignBtn" @click="deleteSignature">
              <i class="ri-delete-bin-6-line" style="color: red; text-decoration: none;"></i>
            </button>
            <label class="form-label mb-0">Çəkilən İmza:</label>
          </div>
          <canvas ref="previewCanvas" class="signature-preview-canvas"></canvas>
        </div>
      </div>

      <!-- Ümumi qiymət -->
      <!-- <div class="mb-3">
        <label for="totalPrice" class="form-label">Ümumi qiymət</label>
        <input type="text" class="form-control" id="totalPrice" placeholder="Hesablanmış qiymət" disabled />
      </div> -->

      <!-- İstifadəçi -->
      <!-- <div class="mb-3">
        <label for="user" class="form-label">İstifadəçi</label>
        <input type="text" class="form-control" id="user" placeholder="Aktiv istifadəçi" disabled />
      </div> -->

      <!-- Yadda saxla düyməsi -->
      <button type="submit" class="customBtn mt-4 pageSubmitBtn">Yadda saxla</button>
    </form>

    <!-- Form Modalı -->
    <Modal :isOpen="isModalOpen" @close="closeModal">
      <template v-if="modalType === 'organization'">
        <h3 class="mb-4">Qurum əlavə et</h3>
        <form>
          <!-- Ad -->
          <div class="mb-3">
            <label for="name" class="form-label">Ad</label>
            <input type="text" class="form-control" id="name" placeholder="Qurumun adı" />
          </div>
          <!-- Qurum növü -->
          <div class="mb-3">
            <label for="type" class="form-label">Qurum növü</label>
            <select class="form-select" id="type">
              <option value="özəl">Özəl şirkət</option>
              <option value="mağaza">Mağaza</option>
              <option value="fiziki">Fiziki şəxs</option>
              <option value="digər">Digər</option>
            </select>
          </div>
          <!-- Məsul şəxs -->
          <div class="mb-3">
            <label for="responsible" class="form-label">Məsul şəxs</label>
            <input type="text" class="form-control" id="responsible" placeholder="Məsul şəxsin adı" />
          </div>

          <!-- Telefon -->
          <div class="mb-3">
            <label for="phone" class="form-label">Telefon</label>
            <input type="text" class="form-control" id="phone" placeholder="Telefon nömrəsi" />
          </div>

          <!-- Mail -->
          <div class="mb-3"> 
            <label for="email" class="form-label">Mail</label>
            <input type="email" class="form-control" id="email" placeholder="E-poçt ünvanı" />
          </div>

          <!-- Adress -->
          <div class="mb-3">
            <label for="address" class="form-label">Adress</label>
            <input type="text" class="form-control" id="address" placeholder="Qurumun ünvanı" />
          </div>
          <button type="submit" class="customBtn mt-4">Yadda saxla</button>
        </form>
      </template>

      <template v-else-if="modalType === 'product'">
        <h3 class="mb-4">Məhsul əlavə et</h3>
        <form>
          <!-- Ad -->
          <div class="mb-3">
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

          <!-- Qiymət -->
          <div class="mb-3">
            <label for="price" class="form-label">Qiymət</label>
            <input type="number" class="form-control" id="price" placeholder="Məhsulun qiyməti" />
          </div>
          <button type="submit" class="customBtn mt-4">Yadda saxla</button>
        </form>
      </template>

      <template v-else-if="modalType === 'signature'">
        <h3 class="mb-4">İmza əlavə et</h3>
        <SignaturePad @save="handleSignatureSave" @close="closeModal" />
      </template>
    </Modal>
    
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
  </div>
</template>

<script setup>
import Aos from 'aos';
import Modal from '../components/Modal.vue'
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import SignaturePad from '../components/SignaturePad.vue';
import SearchableSelect from '../components/SearchableSelect.vue';

const companies = ref([
  { value: 'şirkət1', name: 'Şirkət 1' },
  { value: 'şirkət2', name: 'Şirkət 2' },
  { value: 'şirkət3', name: 'Şirkət 3' },
  { value: 'şirkət4', name: 'Şirkət 4' },
]);

const products = ref([
  { value: 'məhsul1', name: 'Məhsul 1' },
  { value: 'məhsul2', name: 'Məhsul 2' },
  { value: 'məhsul3', name: 'Məhsul 3' },
  { value: 'məhsul4', name: 'Məhsul 4' },
]);

const selectedCompany = ref(null);
const selectedProduct = ref(null);
const companySearch = ref('');
const showSignaturePad = ref(false); // İmza çəkmək üçün canvas-ın görünməsi
const savedSignature = ref(null); // Çəkilən imzanın məlumatı
const isModalOpen = ref(false)
const isImageModalOpen = ref(false)
const modalType = ref('')
const invoiceInput = ref(null)
const cameraInput = ref(null)
const selectedImage = ref('')
const showOptions = ref(false)

const invoiceFiles = ref([]); // Şəkil faylları
const isFileListOpen = ref(false); // Şəkil siyahısının açıq olub-olmaması
const currentImageIndex = ref(0)

const filteredCompanies = computed(() => {
  if (!companySearch.value) return companies.value;
  const searchTerm = companySearch.value.toLowerCase();
  return companies.value.filter(company => 
    company.name.toLowerCase().includes(searchTerm)
  );
});

const todayDate = ref(new Date().toISOString().slice(0, 10));

function handleSignatureSave(signatureData) {
  savedSignature.value = signatureData; // Çəkilən imzanı yadda saxla
  showSignaturePad.value = false; // İmza çəkmək üçün olan canvas-ı gizlət

  // İkinci canvas-ı yeniləmək üçün
  nextTick(() => {
    const canvas = document.querySelector('.signature-preview-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = signatureData;
    }
  });
}

onMounted(() => {
  watch(savedSignature, (newSignature) => {
    if (newSignature) {
      const canvas = document.querySelector('.signature-preview-canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = newSignature;
    }
  });
});

function deleteSignature() {
  savedSignature.value = null; // Çəkilən imzanı sil
  const canvas = document.querySelector('.signature-preview-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas-ı təmizlə
  }
}

function showUploadOptions() {
  showOptions.value = !showOptions.value
}

function openCamera() {
  showOptions.value = false
  cameraInput.value.click()
}

function openGallery() {
  showOptions.value = false
  invoiceInput.value.click()
}

function toggleFileList() {
  isFileListOpen.value = !isFileListOpen.value;
  const icon = document.querySelector('.ri-arrow-down-double-line');
  if (icon) {
    if (isFileListOpen.value) {
      icon.style.transform = 'rotate(180deg)';
    } else {
      icon.style.transform = 'rotate(0deg)';
    }
  }
}

function openModal(type) {
  console.log(`Modal açıldı: ${type}`);
  modalType.value = type
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function showImage(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = e.target.result
    isImageModalOpen.value = true
    // Cari şəkilin indeksini tap
    currentImageIndex.value = invoiceFiles.value.findIndex(f => f.file === file)
  }
  reader.readAsDataURL(file)
}

function closeImageModal() {
  isImageModalOpen.value = false
}

function handleInvoiceUpload(event) {
  const files = event.target.files
  const currentCount = invoiceFiles.value.length
  for (let i = 0; i < files.length; i++) {
    invoiceFiles.value.push({
      name: `Qaimə ${currentCount + i + 1}`,
      file: files[i]
    })
  }
}

function deleteImage(index) {
  invoiceFiles.value.splice(index, 1)
}

function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + invoiceFiles.value.length) % invoiceFiles.value.length
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = e.target.result
  }
  reader.readAsDataURL(invoiceFiles.value[currentImageIndex.value].file)
}

function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % invoiceFiles.value.length
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = e.target.result
  }
  reader.readAsDataURL(invoiceFiles.value[currentImageIndex.value].file)
}

function selectCompany(company) {
  selectedCompany.value = company;
  companySearch.value = '';
}
</script>

<style scoped>
.signature-preview-canvas {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  height: auto;
}
h3 {
  color: #800020; /* Başlıq rəngi */
}
.mb-3 {
  margin-bottom: 1rem;
}

.form-label {
  display: block; /* Label üstdə görünəcək */
  margin-bottom: 0.5rem; /* Label ilə input arasında boşluq */
}

.d-flex {
  display: flex;
  align-items: center; /* Input və düymə eyni xəttdə olacaq */
}

.me-2 {
  margin-right: 0.5rem; /* Input ilə düymə arasında boşluq */
}

.ms-2 {
  margin-left: 0.5rem; /* Düymə ilə input arasında boşluq */
}

.preview-image {
  max-width: 100%;
  height: auto;
}

.showImgBtn, .delImgBtn, .delSignBtn{
  background-color: transparent;
  border: 1px solid lightgray;
  border-radius: 7px;
  margin-left: 10px;
}
.delSignBtn {
  margin-left: 0;
  margin-right: 10px;
}

.uploaded-file-container .file-list {
  max-height: 0; /* Başlanğıcda hündürlük 0 olacaq */
  overflow: hidden; /* Məzmun gizlədilir */
  transition: max-height 0.3s ease; /* Yumşaq keçid */
}

.uploaded-file-container .file-list.open {
  max-height: 500px; /* Maksimum hündürlük (kifayət qədər böyük bir dəyər) */
}

.ri-arrow-down-double-line {
  transition: transform 0.3s ease; /* Yumşaq keçid */
  margin-left: 10px;
}

.uploaded-file-container .header {
  cursor: pointer;
}
.uploaded-file-container h6 {
  font-weight: 600;
}
.uploaded-file-container .file-list.open + .header .ri-arrow-down-double-line {
  transform: rotate(180deg); /* Açıq olduqda döndür */
}

.uploaded-file-container .file-list:not(.open) + .header .ri-arrow-down-double-line {
  transform: rotate(0deg); /* Bağlı olduqda olduğu kimi qal */
}

@media screen and (max-width: 768px) {
  .uploaded-file-container h6 {
    font-size: 14px;
  }
}

/* .image-modal-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
} */

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

/* Sarchable input CSS  */
.form-control,
.form-select,
.v-select {
  width: 100%; /* Tam ekran genişlik */
  max-width: 100%; /* Maksimum genişlik */
  box-sizing: border-box; /* Padding və border genişliyə daxil olsun */
}
.v-select {
  display: block; /* Blok elementi kimi davran */
  width: 100%; /* Tam ekran genişlik */
  max-width: 100%; /* Maksimum genişlik */
}
.v-select .dropdown-menu {
  width: 100%; /* Axtarış siyahısının genişliyi */
}
/* Scoped CSS üçün */
::v-deep(.vue-dropdown-item.highlighted) {
  background-color: #800020;
  color: #fff;
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

.upload-options {
  display: flex;
  gap: 10px;
}

@media screen and (max-width: 480px) {
  .upload-options {
    flex-direction: column;
    width: 100%;
  }
  
  .upload-options button {
    width: 100%;
    margin-bottom: 8px;
  }
}

.custom-select {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-align: left;
  cursor: pointer;
}

.form-control:focus,
.custom-select:focus {
  border-color: #800020 !important;
  box-shadow: 0 0 0 0.25rem rgba(128, 0, 32, 0.25) !important;
  outline: none;
}

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

.form-control:focus,
.form-select:focus {
  border-color: #800020 !important;
  box-shadow: 0 0 0 0.25rem rgba(128, 0, 32, 0.25) !important;
  outline: none;
}

</style>