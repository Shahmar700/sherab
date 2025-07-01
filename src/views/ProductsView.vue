<template>
  <div class="mt-5 pb-5 container-fluid">
    <h3 class="mb-4 pageHeading">Bütün məhsullar</h3>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Axtarış..."
        v-model="searchQuery"
      />
    </div>
    <!-- PRINT BTN  -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-md-none scroll-indicator">
        <small><i class="fas fa-arrows-left-right me-1"></i> Cədvəli tam görmək üçün sağa-sola sürüşdürün</small>
      </div>
    </div>
    <button @click="printTable" class="prntBtn btn btn-primary border">
        <i class="fas fa-print me-2"></i> Çap et
    </button>
    <div class="table-responsive">
         <table class="table table-bordered table-hover table-striped table-borderless" data-aos="zoom-out">
      <thead class="table-dark">
        <tr>
          <th>№</th>
          <th @click="toggleSort('date')">
            Tarix
            <span :class="{ 'rotate-icon': sortKey === 'date' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('productName')">
            Məhsul adı
            <span :class="{ 'rotate-icon': sortKey === 'productName' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('unit')">
            Vahid
            <span :class="{ 'rotate-icon': sortKey === 'unit' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('quantity')">
            Say
            <span :class="{ 'rotate-icon': sortKey === 'quantity' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('purchasePrice')">
            Alış qiyməti
            <span :class="{ 'rotate-icon': sortKey === 'purchasePrice' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('sellPrice')">
            Satış qiyməti
            <span :class="{ 'rotate-icon': sortKey === 'sellPrice' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('createdAt')">
            Yaradılma tarixi
            <span :class="{ 'rotate-icon': sortKey === 'createdAt' && sortOrder === 'desc' }">▲</span>
          </th>
          <th>Çap</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ product.date }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.unit }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.purchasePrice }} AZN</td>
          <td>{{ product.sellPrice }} AZN</td>
          <td>{{ product.createdAt }}</td>
          <td>
            <button class="btn btn-success"><i class="fas fa-print me-2"></i></button>
          </td>
        </tr>
        <tr v-if="filteredProducts.length === 0" data-aos="zoom-in">
          <td colspan="9" class="text-center py-4">Axtarışa uyğun nəticə tapılmadı</td>
        </tr>
      </tbody>
    </table>
    </div>
    <nav v-if="totalPages > 1" data-aos="zoom-in">
      <ul class="pagination justify-content-center">
        <!-- İlk səhifəyə keçid -->
        <li class="navArrow" :class="{ disabled: currentPage === 1 }">
          <button @click="goToPage(1)" :disabled="currentPage === 1">
            &laquo;
          </button>
        </li>

        <!-- Əvvəlki səhifəyə keçid -->
        <li class="navArrow" :class="{ disabled: currentPage === 1 }">
          <button @click="prevPage" :disabled="currentPage === 1">
            &lt;
          </button>
        </li>

        <!-- Səhifə nömrələri -->
        <li
          v-for="page in visiblePages"
          :key="page"
          class="page-item pagNums"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">
            {{ page }}
          </button>
        </li>

        <!-- Üç nöqtə -->
        <li v-if="currentPage < totalPages - 2" class="page-item disabled">
          <span class="page-link">...</span>
        </li>

        <!-- Növbəti səhifəyə keçid -->
        <li class="navArrow" :class="{ disabled: currentPage === totalPages }">
          <button @click="nextPage" :disabled="currentPage === totalPages">
            &gt;
          </button>
        </li>

        <!-- Son səhifəyə keçid -->
        <li class="navArrow" :class="{ disabled: currentPage === totalPages }">
          <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const products = ref([
  {
    date: "2025-04-15",
    productName: "Nectar Pro 1 lt",
    unit: "ədəd",
    quantity: 20,
    purchasePrice: 40,
    sellPrice: 57,
    createdAt: "2025-02-05",
  },
  {
    date: "2025-04-10",
    productName: "Coca-Cola 0.5 lt",
    unit: "qutu",
    quantity: 50,
    purchasePrice: 25,
    sellPrice: 35,
    createdAt: "2025-01-15",
  },
  {
    date: "2025-04-12",
    productName: "Fanta Orange 1 lt",
    unit: "ədəd",
    quantity: 30,
    purchasePrice: 35,
    sellPrice: 48,
    createdAt: "2025-02-10",
  },
  {
    date: "2025-04-18",
    productName: "Sprite 0.33 lt",
    unit: "qutu",
    quantity: 60,
    purchasePrice: 20,
    sellPrice: 28,
    createdAt: "2025-03-01",
  },
  {
    date: "2025-04-05",
    productName: "Pepsi 1.5 lt",
    unit: "ədəd",
    quantity: 25,
    purchasePrice: 45,
    sellPrice: 65,
    createdAt: "2025-01-20",
  },
  {
    date: "2025-04-22",
    productName: "Mountain Dew 0.5 lt",
    unit: "qutu",
    quantity: 40,
    purchasePrice: 30,
    sellPrice: 42,
    createdAt: "2025-03-15",
  },
  {
    date: "2025-04-08",
    productName: "Red Bull 0.25 lt",
    unit: "ədəd",
    quantity: 35,
    purchasePrice: 60,
    sellPrice: 85,
    createdAt: "2025-02-18",
  },
  {
    date: "2025-04-17",
    productName: "Sirab 1 lt",
    unit: "ədəd",
    quantity: 45,
    purchasePrice: 15,
    sellPrice: 22,
    createdAt: "2025-03-05",
  },
  {
    date: "2025-04-20",
    productName: "Badamlı 0.5 lt",
    unit: "qutu",
    quantity: 55,
    purchasePrice: 18,
    sellPrice: 25,
    createdAt: "2025-03-20",
  },
  {
    date: "2025-04-11",
    productName: "Ice Tea Lemon 0.5 lt",
    unit: "ədəd",
    quantity: 38,
    purchasePrice: 32,
    sellPrice: 45,
    createdAt: "2025-02-25",
  }
]);

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

const sortKey = ref(null);
const sortOrder = ref('asc');

const toggleSort = (key) => {
  if (sortKey.value === key) {
    // Əgər eyni sütun seçilibsə, sıralama qaydasını dəyiş
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Yeni sütun seçilibsə, sıralama qaydasını "asc" olaraq təyin et
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const filteredProducts = computed(() => {
  let filtered = products.value.filter((product) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  if (sortKey.value) {
    filtered = filtered.sort((a, b) => {
      let valA = a[sortKey.value];
      let valB = b[sortKey.value];

      // Xüsusi sıralama qaydaları (məsələn, vahid üçün)
      if (sortKey.value === "unit") {
        const unitOrder = { "ədəd": 1, "qutu": 2 };
        valA = unitOrder[valA] || 3;
        valB = unitOrder[valB] || 3;
      }

      // Tarix sıralaması
      if (sortKey.value === "date" || sortKey.value === "createdAt") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      // Ədədi dəyərlər üçün sıralama (qiymət və miqdar)
      if (["quantity", "purchasePrice", "sellPrice"].includes(sortKey.value)) {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (sortOrder.value === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }

  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(
    products.value.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    ).length / itemsPerPage
  );
});

// Pagination üçün əlavə funksiyalar
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 3; // Maksimum görünən səhifə sayı
  const startPage = Math.max(1, currentPage.value - 1);
  const endPage = Math.min(totalPages.value, startPage + maxVisible - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// ÇAP ET FUNKSİYASI 
const printTable = () => {
  // Bütün məhsulları əhatə edən çap pəncərəsi
  const printWindow = window.open('', '_blank');
  
  // Çap olunacaq məlumatların başlığı və stili
  const printContent = `
    <html>
    <head>
      <title>Bütün məhsullar</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #dee2e6; padding: 8px; text-align: left; }
        th { background-color: #343a40; color: white; }
        h3 { text-align: center; margin-bottom: 20px; }
        .print-date { text-align: right; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <h3>Bütün məhsullar</h3>
      <div class="print-date">Tarix: ${new Date().toLocaleDateString('az-AZ')}</div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Tarix</th>
            <th>Məhsul adı</th>
            <th>Vahid</th>
            <th>Say</th>
            <th>Alış qiyməti</th>
            <th>Satış qiyməti</th>
            <th>Yaradılma tarixi</th>
          </tr>
        </thead>
        <tbody>
          ${products.value.filter(product => 
            searchQuery.value === "" || 
            Object.values(product).some(value => 
              value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
            )
          ).map((product, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${product.date}</td>
              <td>${product.productName}</td>
              <td>${product.unit}</td>
              <td>${product.quantity}</td>
              <td>${product.purchasePrice} AZN</td>
              <td>${product.sellPrice} AZN</td>
              <td>${product.createdAt}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // Çap məzmununun pəncərəyə yazılması
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
  
  // Səhifə yükləndikdən sonra çap dialoqunu açma
  printWindow.onload = () => {
    printWindow.print();
    // printWindow.onafterprint = () => printWindow.close();
  };
};
</script>

<style scoped>
.pageHeading {
  text-align: center;
}

/* Table border customization */
.table {
  border-collapse: separate;
  border-spacing: 0;
}
.table thead th {
  cursor: pointer;
}
.table thead th span {
  cursor: pointer;
  color: #ba3254;
}
.table th span {
  display: inline-block;
  cursor: pointer;
}

/* İkonun 180 dərəcə döndüyü vəziyyət */
.rotate-icon {
  transform: rotate(180deg);
}
.table td, .table th {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: none;
  border-right: none;
}

.table thead th {
  border-top: none;
  border-bottom: 2px solid #dee2e6;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.pagination button {
  margin: 0 2px;
}
.pagination .pagNums {
  margin: 0 2px;
}
.navArrow button {
  height: 38px;
  padding: 6px 12px;
  border-radius: 0.25rem;
  border: 1px solid lightgray;
  background-color: whitesmoke;
}
.navArrow.disabled button {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

.navArrow button {
  height: 38px;
  padding: 6px 12px;
  border-radius: 0.25rem;
  border: 1px solid lightgray;
  background-color: whitesmoke;
}
 .page-item .page-link {
  color: #800020 !important;
 }
.page-item.active .page-link {
  background-color: #800020 !important;
  border-color: #800020 !important;
  color: white !important;
  box-shadow: 0 0 0 0.15rem rgba(128, 0, 32, 0.25) !important;
}

.page-item .page-link:focus {
  background-color: #800020 !important;
  border-color: #800020 !important;
  box-shadow: none;
}
</style>