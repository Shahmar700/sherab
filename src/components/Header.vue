<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Logo</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleSidebar"
        aria-controls="sidebar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <RouterLink class="nav-link dropdown-toggle" to="/orders/add" role="button" data-bs-hover="dropdown" aria-expanded="false">
              Sifarişlər
              <i class="fa-solid fa-chevron-right dropdown-icon"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" :to="{ name: 'add-order'}">Sifariş əlavə et</RouterLink></li>
              <li><RouterLink class="dropdown-item" :to="{name: 'all-orders'}">Sifarişlərim</RouterLink></li>
            </ul>
          </li> 
          <li class="nav-item dropdown">
            <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-hover="dropdown" aria-expanded="false">
              Məhsullar
              <i class="fa-solid fa-chevron-right dropdown-icon"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/products/add">Məhsullar əlavə et</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/products">Məhsullarım</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-hover="dropdown" aria-expanded="false">
              Qurumlar
              <i class="fa-solid fa-chevron-right dropdown-icon"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/organizations/add">Qurum əlavə et</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/organizations">Qurumlarım</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Sidebar -->
  <div :class="['sidebar', { open: isSidebarOpen }]" id="sidebar">
    <button class="close-btn" @click="toggleSidebar">&times;</button>
    <ul class="nav flex-column mt-4">
      <li class="nav-item border-bottom">
        <div class="dropdown">
          <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sifarişlər
            <i class="fa-solid fa-chevron-right dropdown-icon"></i>
          </RouterLink>
          <ul class="dropdown-menu">
            <li><RouterLink class="dropdown-item" to="/orders/add" @click="toggleSidebar">Sifariş əlavə et</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/orders" @click="toggleSidebar">Sifarişlərim</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="nav-item border-bottom">
        <div class="dropdown">
          <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Məhsullar
            <i class="fa-solid fa-chevron-right dropdown-icon"></i>
          </RouterLink>
          <ul class="dropdown-menu">
            <li><RouterLink class="dropdown-item" to="/products/add" @click="toggleSidebar">Məhsullar əlavə et</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/products" @click="toggleSidebar">Məhsullarım</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="nav-item border-bottom">
        <div class="dropdown">
          <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Qurumlar
            <i class="fa-solid fa-chevron-right dropdown-icon"></i>
          </RouterLink>
          <ul class="dropdown-menu">
            <li><RouterLink class="dropdown-item" to="/organizations/add" @click="toggleSidebar">Qurum əlavə et</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/organizations" @click="toggleSidebar">Qurumlarım</RouterLink></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  // Sidebar dropdown-lar üçün icon fırlanması
  const sidebar = document.getElementById('sidebar');
  document.addEventListener('click', (event) => {
    const dropdownToggles = sidebar.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach((toggle) => {
      const dropdownMenu = toggle.nextElementSibling; // Dropdown menu
      const icon = toggle.querySelector('.dropdown-icon'); // Dropdown icon

      if (dropdownMenu && dropdownMenu.classList.contains('show')) {
        icon.style.transform = 'rotate(90deg)'; // Açıq vəziyyətdə 90 dərəcə
      } else {
        icon.style.transform = 'rotate(0deg)'; // Bağlı vəziyyətdə 0 dərəcə
      }
    });
  });
});
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #800020 !important;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link.active {
  font-weight: bold;
  color: #ffffff;
}

/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background-color: #800020;
  color: #fff;
  transition: right 0.3s ease;
  z-index: 1050;
  padding: 1rem;
  border: 1px solid #560016;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 5px;
}

.sidebar.open {
  right: 0;
}

.sidebar .close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.sidebar .nav-link {
  color: #fff;
  margin-top: 1rem;
  text-decoration: none;
  border-bottom: 1px solid gray;
}

.sidebar .nav-link.active {
  font-weight: bold;
  color: #f8f9fa;
  border-bottom: 2px solid #f8f9fa;
  font-size: 18px;
}

#navbarNav .nav-link:hover > .dropdown-icon{
  transform: rotate(90deg) !important;
}

.dropdown-icon {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
  font-size: 12px;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.dropdown-item {
  padding: 8px 20px;
  color: #333;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #800020;
}

.sidebar .dropdown-menu {
  position: relative;
  float: none;
  width: 100%;
  margin-top: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
  display: none;
  transition: all 0.3s ease;
}

.sidebar .dropdown-menu.show {
  display: block;
}

.sidebar .dropdown-toggle[aria-expanded="true"] .dropdown-icon {
  transform: rotate(90deg);
}

.sidebar .dropdown-item {
  padding-left: 40px;
  color: #fff;
  transition: all 0.3s ease;
}

.sidebar .dropdown-item:hover {
  background-color: rgba(255,255,255,0.1);
  color: #fff;
  padding-left: 45px;
}

#sidebar .dropdown-menu {
  background-color: #f8f9fa;
  position: relative;
  height: 0px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

#sidebar .dropdown-menu.show {
  height: fit-content;
  opacity: 1;
  visibility: visible;
}

#sidebar .dropdown-menu a {
  color: #800020 !important;
  transition: all 0.3s ease;
}

#sidebar .dropdown-menu a:hover {
  padding-left: 45px;
}

#sidebar .dropdown-toggle[aria-expanded="true"] .dropdown-icon {
  transform: rotate(90deg);
}

@media (min-width: 768px) {
  .dropdown:hover .dropdown-menu {
    display: block;
  }
  
  .dropdown:hover .dropdown-toggle .dropdown-icon {
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .navbar-nav .dropdown-menu {
    position: static;
    float: none;
    width: 100%;
    margin-top: 0;
    background-color: #fff;
    border: none;
    box-shadow: none;
  }
  
  .dropdown-toggle[aria-expanded="true"] .dropdown-icon {
    transform: rotate(90deg);
  }
}
</style>