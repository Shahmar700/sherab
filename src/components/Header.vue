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
          <!-- ===== Orders =====  -->
          <li class="nav-item dropdown">
            <RouterLink class="nav-link dropdown-toggle" to="/orders/add" role="button" data-bs-hover="dropdown" aria-expanded="false">
              Sifarişlər
              <i class="fa-solid fa-chevron-right dropdown-icon"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" :to="{ name: 'add-order'}">Sifariş əlavə et</RouterLink></li>
              <li><RouterLink class="dropdown-item" :to="{name: 'all-orders'}">Sifarişlərim <i class="fa-solid fa-table text-secondary"></i></RouterLink></li>
            </ul>
          </li> 
          <!-- ===== Products =====  -->
          <li class="nav-item dropdown">
            <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-hover="dropdown" aria-expanded="false">
              Məhsullar
              <i class="fa-solid fa-chevron-right dropdown-icon"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" :to="{name: 'add-products'}">Məhsullar əlavə et</RouterLink></li>
              <li><RouterLink class="dropdown-item" :to="{name: 'all-products'}">Məhsullarım <i class="fa-solid fa-table text-secondary"></i></RouterLink></li>
            </ul>
          </li>
          <!-- ===== Organizations =====  -->
          <li class="nav-item dropdown">
            <RouterLink class="nav-link dropdown-toggle" to="#" role="button" data-bs-hover="dropdown" aria-expanded="false">
              Qurumlar
              <i class="fa-solid fa-chevron-right dropdown-icon"></i>
            </RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" :to="{name: 'add-organizations'}">Qurum əlavə et</RouterLink></li>
              <li><RouterLink class="dropdown-item" :to="{name: 'all-organizations'}">Qurumlarım <i class="fa-solid fa-table text-secondary"></i></RouterLink></li>
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
      <li class="sidebar-item border-bottom">
        <div class="sidebar-menu-group">
          <div class="sidebar-parent" @click="toggleSubmenu($event)">
            <span class="sidebar-link">
              Sifarişlər
              <i class="fa-solid fa-chevron-right sidebar-icon"></i>
            </span>
          </div>
          <ul class="sidebar-submenu">
            <li><RouterLink class="sidebar-submenu-link" :to="{ name: 'add-order'}" @click="toggleSidebar">Sifariş əlavə et</RouterLink></li>
            <li><RouterLink class="sidebar-submenu-link":to="{name: 'all-orders'}" @click="toggleSidebar">Sifarişlərim</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="sidebar-item border-bottom">
        <div class="sidebar-menu-group">
          <div class="sidebar-parent" @click="toggleSubmenu($event)">
            <span class="sidebar-link">
              Məhsullar
              <i class="fa-solid fa-chevron-right sidebar-icon"></i>
            </span>
          </div>
          <ul class="sidebar-submenu">
            <li><RouterLink class="sidebar-submenu-link" :to="{name: 'add-products'}" @click="toggleSidebar">Məhsullar əlavə et</RouterLink></li>
            <li><RouterLink class="sidebar-submenu-link" :to="{name: 'all-products'}" @click="toggleSidebar">Məhsullarım</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="sidebar-item border-bottom">
        <div class="sidebar-menu-group">
          <div class="sidebar-parent" @click="toggleSubmenu($event)">
            <span class="sidebar-link">
              Qurumlar
              <i class="fa-solid fa-chevron-right sidebar-icon"></i>
            </span>
          </div>
          <ul class="sidebar-submenu">
            <li><RouterLink class="sidebar-submenu-link" :to="{name: 'add-organizations'}" @click="toggleSidebar">Qurum əlavə et</RouterLink></li>
            <li><RouterLink class="sidebar-submenu-link" :to="{name: 'all-organizations'}" @click="toggleSidebar">Qurumlarım</RouterLink></li>
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

function toggleSubmenu(event) {
  // Get the parent element
  const parent = event.currentTarget;
  // Find the submenu
  const submenu = parent.nextElementSibling;
  // Find the icon
  const icon = parent.querySelector('.sidebar-icon');
  
  // Toggle the active class for animation/transition
  submenu.classList.toggle('active');
  
  // Rotate the icon when submenu is active
  if (submenu.classList.contains('active')) {
    icon.style.transform = 'rotate(90deg)';
  } else {
    icon.style.transform = 'rotate(0deg)';
  }
}
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

.sidebar-item {
  position: relative;
  width: 100%;
}

.sidebar-menu-group {
  width: 100%;
}

.sidebar-parent {
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-link {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  text-decoration: none;
}

.sidebar-icon {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
  font-size: 12px;
  margin-left: 5px;
}

.sidebar-submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.sidebar-submenu.active {
  max-height: 200px; /* Adjust based on content */
}

.sidebar-submenu-link {
  padding: 8px 0 8px 20px;
  color: #fff;
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.sidebar-submenu-link:hover {
  padding-left: 25px;
  background-color: rgba(255,255,255,0.1);
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