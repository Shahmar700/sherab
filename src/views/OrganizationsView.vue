<template>
  <div class="mt-5 pb-5 container-fluid">
    <h3 class="mb-4 pageHeading">Bütün qurumlar</h3>
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
    <table class="table table-bordered table-hover table-striped table-borderless" data-aos="zoom-out">
      <thead class="table-dark">
        <tr>
          <th>№</th>
          <th @click="toggleSort('date')">
            Tarix
            <span :class="{ 'rotate-icon': sortKey === 'date' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('orgName')">
            Təşkilat adı
            <span :class="{ 'rotate-icon': sortKey === 'orgName' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('typeOfOrg')">
            Təşkilat növü
            <span :class="{ 'rotate-icon': sortKey === 'typeOfOrg' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('responsiblePerson')">
            Məsul şəxs
            <span :class="{ 'rotate-icon': sortKey === 'responsiblePerson' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('phone')">
            Telefon
            <span :class="{ 'rotate-icon': sortKey === 'phone' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('email')">
            Email
            <span :class="{ 'rotate-icon': sortKey === 'email' && sortOrder === 'desc' }">▲</span>
          </th>
          <th @click="toggleSort('adress')">
            Ünvan
            <span :class="{ 'rotate-icon': sortKey === 'adress' && sortOrder === 'desc' }">▲</span>
          </th>
          <th>Çap</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(organization, index) in filteredOrganizations" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ organization.date }}</td>
          <td>{{ organization.orgName }}</td>
          <td>{{ organization.typeOfOrg }}</td>
          <td>{{ organization.responsiblePerson }}</td>
          <td>{{ organization.phone }}</td>
          <td>{{ organization.email }}</td>
          <td>{{ organization.adress }}</td>
          <td>
            <button class="btn btn-success"><i class="fas fa-print me-2"></i></button>
          </td>
        </tr>
        <tr v-if="filteredOrganizations.length === 0" data-aos="zoom-in">
          <td colspan="9" class="text-center py-4">Axtarışa uyğun nəticə tapılmadı</td>
        </tr>
      </tbody>
    </table>
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

const organizations = ref([
  {
    date: "2025-04-15",
    orgName: "Azizoglu",
    typeOfOrg: "Özəl şirkət",
    responsiblePerson: "Həsən Məmmədov",
    phone: "077-605-77-75",
    email: "azizhasan@gmail.com",
    adress: "Xocalı prospekti, Bakı",
  },
  {
    date: "2025-04-10",
    orgName: "Araz Market",
    typeOfOrg: "Mağaza",
    responsiblePerson: "Aydın Əliyev",
    phone: "050-333-44-55",
    email: "araz@market.az",
    adress: "28 May küç., Gəncə",
  },
  {
    date: "2025-04-12",
    orgName: "Qasimov MMC",
    typeOfOrg: "Özəl şirkət",
    responsiblePerson: "Fuad Qasımov",
    phone: "055-777-88-99",
    email: "info@qasimovmmc.az",
    adress: "Nizami küç. 15, Bakı",
  },
  {
    date: "2025-04-18",
    orgName: "Əhmədli Ticarət",
    typeOfOrg: "Mağaza",
    responsiblePerson: "Səbinə Əhmədli",
    phone: "070-555-66-77",
    email: "ehmedlitc@gmail.com",
    adress: "Sahil küç. 8, Sumqayıt",
  },
  {
    date: "2025-04-05",
    orgName: "Nəsibov Biznes",
    typeOfOrg: "Fiziki şəxs",
    responsiblePerson: "Rəşad Nəsibov",
    phone: "077-222-33-44",
    email: "rnasibov@mail.ru",
    adress: "Azadlıq prospekti 45, Bakı",
  },
  {
    date: "2025-04-22",
    orgName: "Ulduz Şirniyyat",
    typeOfOrg: "Mağaza",
    responsiblePerson: "Nərgiz Hüseynova",
    phone: "051-444-55-66",
    email: "ulduz@shirn.az",
    adress: "İstiqlaliyyət küç. 12, Bakı",
  },
  {
    date: "2025-04-08",
    orgName: "Tech Solutions",
    typeOfOrg: "Digər",
    responsiblePerson: "Orxan Məmmədli",
    phone: "055-888-99-00",
    email: "contact@techsol.az",
    adress: "Babək prospekti 10, Bakı",
  },
  {
    date: "2025-04-17",
    orgName: "Hüseynov Fermer",
    typeOfOrg: "Fiziki şəxs",
    responsiblePerson: "Elşad Hüseynov",
    phone: "050-777-11-22",
    email: "fermer@huseynov.az",
    adress: "Şamaxı rayonu, Dəmirçi kəndi",
  },
  {
    date: "2025-04-20",
    orgName: "Səhər Ərzaq",
    typeOfOrg: "Özəl şirkət",
    responsiblePerson: "Leyla Səfərli",
    phone: "077-111-22-33",
    email: "info@seherezaq.az",
    adress: "Həzi Aslanov küç. 5, Bakı",
  },
  {
    date: "2025-04-11",
    orgName: "Gülşən Gözəllik Salonu",
    typeOfOrg: "Digər",
    responsiblePerson: "Gülşən Məlikova",
    phone: "055-666-00-11",
    email: "gulshen@beauty.az",
    adress: "28 May küç. 30, Bakı",
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

const filteredOrganizations = computed(() => {
  let filtered = organizations.value.filter((organization) =>
    Object.values(organization).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  if (sortKey.value) {
    filtered = filtered.sort((a, b) => {
      let valA = a[sortKey.value];
      let valB = b[sortKey.value];

      // Xüsusi sıralama qaydaları (məsələn, təşkilat növü üçün)
      if (sortKey.value === "typeOfOrg") {
        const typeOrder = { 
          "Özəl şirkət": 1, 
          "Mağaza": 2, 
          "Fiziki şəxs": 3, 
          "Digər": 4 
        };
        valA = typeOrder[valA] || 5;
        valB = typeOrder[valB] || 5;
      }

      // Tarix sıralaması
      if (sortKey.value === "date") {
        valA = new Date(valA);
        valB = new Date(valB);
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
    organizations.value.filter((organization) =>
      Object.values(organization).some((value) =>
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
  // Bütün təşkilatları əhatə edən çap pəncərəsi
  const printWindow = window.open('', '_blank');
  
  // Çap olunacaq məlumatların başlığı və stili
  const printContent = `
    <html>
    <head>
      <title>Bütün təşkilatlar</title>
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
      <h3>Bütün təşkilatlar</h3>
      <div class="print-date">Tarix: ${new Date().toLocaleDateString('az-AZ')}</div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Tarix</th>
            <th>Təşkilat adı</th>
            <th>Təşkilat növü</th>
            <th>Məsul şəxs</th>
            <th>Telefon</th>
            <th>Email</th>
            <th>Ünvan</th>
          </tr>
        </thead>
        <tbody>
          ${organizations.value.filter(organization => 
            searchQuery.value === "" || 
            Object.values(organization).some(value => 
              value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
            )
          ).map((organization, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${organization.date}</td>
              <td>${organization.orgName}</td>
              <td>${organization.typeOfOrg}</td>
              <td>${organization.responsiblePerson}</td>
              <td>${organization.phone}</td>
              <td>${organization.email}</td>
              <td>${organization.adress}</td>
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