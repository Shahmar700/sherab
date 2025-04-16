<template>
  <div class="mt-5 pb-5 container-fluid">
    <h3 class="mb-4 pageHeading">Bütün sifarişlər</h3>
      <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Axtarış..."
        v-model="searchQuery"
      />
        </div>
    <!-- PRINT BTN  -->
      <div class="d-flex justify-content-end mb-3">
        <button @click="printTable" class="btn btn-primary">
          <i class="fas fa-print me-2"></i> Çap et
        </button>
      </div>
    <table class="table table-bordered table-hover table-striped table-borderless">
        <thead class="table-dark">
            <tr>
                <th>№</th>
                <th @click="toggleSort('date')">
                    Tarix
                    <span :class="{ 'rotate-icon': sortKey === 'date' && sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('company')">
                    Şirkət
                    <span :class="{ 'rotate-icon': sortKey === 'company' &&  sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('user')">
                    İstifadəçi
                    <span :class="{ 'rotate-icon': sortKey === 'user' && sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('product')">
                    Məhsul
                    <span :class="{ 'rotate-icon': sortKey === 'product' && sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('unit')">
                    Vahid
                    <span :class="{ 'rotate-icon': sortKey === 'unit' && sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('quantity')">
                    Say
                    <span :class="{ 'rotate-icon': sortKey === 'quantity' && sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('totalPrice')">
                    Ümumi qiymət
                    <span :class="{ 'rotate-icon': sortKey === 'totalPrice' && sortOrder === 'desc' }">▲</span>
                </th>
                <th>İnvoys</th>
                <th>İmza</th>
                <th @click="toggleSort('createdAt')">
                    Yaradılma tarixi
                    <span :class="{ 'rotate-icon': sortKey === 'createdAt' && sortOrder === 'desc' }">▲</span>
                </th>
                <th @click="toggleSort('updatedAt')">
                    Yenilənmə tarixi
                    <span :class="{ 'rotate-icon': sortKey === 'updatedAt' && sortOrder === 'desc' }">▲</span>
                </th>
                <th>
                    Çap
                </th>
            </tr>
    </thead>
        <tbody>
            <tr
            v-for="(order, index) in filteredOrders"
            :key="index"
            >
            <td>{{ index + 1 }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.company }}</td>
            <td>{{ order.user }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.unit }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.invoice }}</td>
            <td>{{ order.signature }}</td>
            <td>{{ order.createdAt }}</td>
            <td>{{ order.updatedAt }}</td>
            <td>
              <button class="btn btn-success"><i class="fas fa-print me-2"></i></button>
            </td>
            </tr>
        </tbody>
    </table>
    <nav v-if="totalPages > 1">
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

const orders = ref([
  {
    date: "2025-04-01",
    company: "Şirkət A",
    user: "İstifadəçi 1",
    product: "Məhsul A",
    unit: "ədəd",
    quantity: 10,
    totalPrice: "100 AZN",
    invoice: "INV-001",
    signature: "İmza 1",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-05",
  },
  {
    date: "2025-04-02",
    company: "Şirkət B",
    user: "İstifadəçi 2",
    product: "Məhsul B",
    unit: "ədəd",
    quantity: 5,
    totalPrice: "50 AZN",
    invoice: "INV-002",
    signature: "İmza 2",
    createdAt: "2025-03-02",
    updatedAt: "2025-03-06",
  },
  // 8 daha məlumat əlavə edin
  {
    date: "2025-04-03",
    company: "Şirkət C",
    user: "İstifadəçi 3",
    product: "Məhsul C",
    unit: "ədəd",
    quantity: 15,
    totalPrice: "150 AZN",
    invoice: "INV-003",
    signature: "İmza 3",
    createdAt: "2025-03-03",
    updatedAt: "2025-03-07",
  },
  {
    date: "2025-04-04",
    company: "Şirkət D",
    user: "İstifadəçi 4",
    product: "Məhsul D",
    unit: "ədəd",
    quantity: 20,
    totalPrice: "200 AZN",
    invoice: "INV-004",
    signature: "İmza 4",
    createdAt: "2025-03-04",
    updatedAt: "2025-03-08",
  },
  {
    date: "2025-04-05",
    company: "Şirkət E",
    user: "İstifadəçi 5",
    product: "Məhsul E",
    unit: "ədəd",
    quantity: 8,
    totalPrice: "80 AZN",
    invoice: "INV-005",
    signature: "İmza 5",
    createdAt: "2025-03-05",
    updatedAt: "2025-03-09",
  },
  {
    date: "2025-04-06",
    company: "Şirkət F",
    user: "İstifadəçi 6",
    product: "Məhsul F",
    unit: "ədəd",
    quantity: 12,
    totalPrice: "120 AZN",
    invoice: "INV-006",
    signature: "İmza 6",
    createdAt: "2025-03-06",
    updatedAt: "2025-03-10",
  },
  {
    date: "2025-04-07",
    company: "Şirkət G",
    user: "İstifadəçi 7",
    product: "Məhsul G",
    unit: "ədəd",
    quantity: 25,
    totalPrice: "250 AZN",
    invoice: "INV-007",
    signature: "İmza 7",
    createdAt: "2025-03-07",
    updatedAt: "2025-03-11",
  },
  {
    date: "2025-04-08",
    company: "Şirkət H",
    user: "İstifadəçi 8",
    product: "Məhsul H",
    unit: "ədəd",
    quantity: 30,
    totalPrice: "300 AZN",
    invoice: "INV-008",
    signature: "İmza 8",
    createdAt: "2025-03-08",
    updatedAt: "2025-03-12",
  },
  {
    date: "2025-04-09",
    company: "Şirkət I",
    user: "İstifadəçi 9",
    product: "Məhsul I",
    unit: "ədəd",
    quantity: 18,
    totalPrice: "180 AZN",
    invoice: "INV-009",
    signature: "İmza 9",
    createdAt: "2025-03-09",
    updatedAt: "2025-03-13",
  },
  {
    date: "2025-04-10",
    company: "Şirkət J",
    user: "İstifadəçi 10",
    product: "Məhsul J",
    unit: "ədəd",
    quantity: 22,
    totalPrice: "220 AZN",
    invoice: "INV-010",
    signature: "İmza 10",
    createdAt: "2025-03-10",
    updatedAt: "2025-03-14",
  },
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

const filteredOrders = computed(() => {
  let filtered = orders.value.filter((order) =>
    Object.values(order).some((value) =>
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
      if (sortKey.value === "date" || sortKey.value === "createdAt" || sortKey.value === "updatedAt") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      // Ümumi qiymət sıralaması (AZN çıxarılır və rəqəmə çevrilir)
      if (sortKey.value === "totalPrice") {
        valA = parseFloat(valA.replace(" AZN", ""));
        valB = parseFloat(valB.replace(" AZN", ""));
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

const sortTable = (key, order) => {
  sortKey.value = key;
  sortOrder.value = order;
};

const totalPages = computed(() => {
  return Math.ceil(
    orders.value.filter((order) =>
      Object.values(order).some((value) =>
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

// Bu kodu script setup hissəsində, digər funksiyalarla birlikdə əlavə edin
const printTable = () => {
  // Bütün sifarişləri əhatə edən çap pəncərəsi
  const printWindow = window.open('', '_blank');
  
  // Çap olunacaq məlumatların başlığı və stili
  const printContent = `
    <html>
    <head>
      <title>Bütün sifarişlər</title>
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
      <h3>Bütün sifarişlər</h3>
      <div class="print-date">Tarix: ${new Date().toLocaleDateString('az-AZ')}</div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Tarix</th>
            <th>Şirkət</th>
            <th>İstifadəçi</th>
            <th>Məhsul</th>
            <th>Vahid</th>
            <th>Say</th>
            <th>Ümumi qiymət</th>
            <th>İnvoys</th>
            <th>İmza</th>
            <th>Yaradılma tarixi</th>
            <th>Yenilənmə tarixi</th>
          </tr>
        </thead>
        <tbody>
          ${orders.value.filter(order => 
            searchQuery.value === "" || 
            Object.values(order).some(value => 
              value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
            )
          ).map((order, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${order.date}</td>
              <td>${order.company}</td>
              <td>${order.user}</td>
              <td>${order.product}</td>
              <td>${order.unit}</td>
              <td>${order.quantity}</td>
              <td>${order.totalPrice}</td>
              <td>${order.invoice}</td>
              <td>${order.signature}</td>
              <td>${order.createdAt}</td>
              <td>${order.updatedAt}</td>
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
  /* transition: transform 0.3s ease; */
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

.pagination button{
    margin: 0 2px;
}
.pagination .pagNums{
    margin: 0 2px;
}
.navArrow button{
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
  /* box-shadow: 0 0 0 0.25rem rgba(128, 0, 32, 0.25) !important; */
  box-shadow: 0 0 0 0.15rem rgba(128, 0, 32, 0.25) !important;
}

.page-item .page-link:focus {
  background-color: #800020 !important;
  border-color: #800020 !important;
  /* box-shadow: 0 0 0 0.25rem rgba(128, 0, 32, 0.25) !important; */
  box-shadow: none;
}
</style>