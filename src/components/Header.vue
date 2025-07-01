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
          <div :class="['sidebar-parent', { 'sidebar-active': isOrdersActive }]" @click="toggleSubmenu($event)">
            <span class="sidebar-link">
              Sifarişlər
              <i class="fa-solid fa-chevron-right sidebar-icon"></i>
            </span>
          </div>
          <ul :class="['sidebar-submenu', { 'active': isOrdersActive }]">
            <li><RouterLink class="sidebar-submenu-link" :class="{ 'active': $route.name === 'add-order' }" :to="{ name: 'add-order'}" @click="toggleSidebar">Sifariş əlavə et</RouterLink></li>
            <li><RouterLink class="sidebar-submenu-link" :class="{ 'active': $route.name === 'all-orders' }" :to="{name: 'all-orders'}" @click="toggleSidebar">Sifarişlərim</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="sidebar-item border-bottom">
        <div class="sidebar-menu-group">
          <div :class="['sidebar-parent', { 'sidebar-active': isProductsActive }]" @click="toggleSubmenu($event)">
            <span class="sidebar-link">
              Məhsullar
              <i class="fa-solid fa-chevron-right sidebar-icon"></i>
            </span>
          </div>
          <ul :class="['sidebar-submenu', { 'active': isProductsActive }]">
            <li><RouterLink class="sidebar-submenu-link" :class="{ 'active': $route.name === 'add-products' }" :to="{name: 'add-products'}" @click="toggleSidebar">Məhsullar əlavə et</RouterLink></li>
            <li><RouterLink class="sidebar-submenu-link" :class="{ 'active': $route.name === 'all-products' }" :to="{name: 'all-products'}" @click="toggleSidebar">Məhsullarım</RouterLink></li>
          </ul>
        </div>
      </li>
      <li class="sidebar-item border-bottom">
        <div class="sidebar-menu-group">
          <div :class="['sidebar-parent', { 'sidebar-active': isOrganizationsActive }]" @click="toggleSubmenu($event)">
            <span class="sidebar-link">
              Qurumlar
              <i class="fa-solid fa-chevron-right sidebar-icon"></i>
            </span>
          </div>
          <ul :class="['sidebar-submenu', { 'active': isOrganizationsActive }]">
            <li><RouterLink class="sidebar-submenu-link" :class="{ 'active': $route.name === 'add-organizations' }" :to="{name: 'add-organizations'}" @click="toggleSidebar">Qurum əlavə et</RouterLink></li>
            <li><RouterLink class="sidebar-submenu-link" :class="{ 'active': $route.name === 'all-organizations' }" :to="{name: 'all-organizations'}" @click="toggleSidebar">Qurumlarım</RouterLink></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)

// Computed properties to check which route is active
const isOrdersActive = computed(() => {
  return route.path.includes('/orders')
})

const isProductsActive = computed(() => {
  return route.path.includes('/products')
})

const isOrganizationsActive = computed(() => {
  return route.path.includes('/organizations')
})

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

onMounted(() => {
  // Automatically open the active section's submenu
  if (isOrdersActive.value || isProductsActive.value || isOrganizationsActive.value) {
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
      const sidebar = document.getElementById('sidebar');
      // Find active submenu that should be open by default
      const activeSubmenus = sidebar.querySelectorAll('.sidebar-submenu.active');
      activeSubmenus.forEach(submenu => {
        // Find the parent icon and rotate it
        const parentIcon = submenu.previousElementSibling.querySelector('.sidebar-icon');
        if (parentIcon) {
          parentIcon.style.transform = 'rotate(90deg)';
        }
      });
    }, 100);
  }
})
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
  margin-top: 5px;
}

.sidebar-parent {
  padding: 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  transition: all 0.2s ease;
}

/* Active parent menu styling */
.sidebar-parent.sidebar-active {
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */
  font-weight: bold;
  border-radius: 10px;
}

.sidebar-parent.sidebar-active .sidebar-icon {
  transform: rotate(90deg);
}

.sidebar-link {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  text-decoration: none;
  padding: 5px 10px;
  font-size: 18px;
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
  border-left: 3px solid transparent;
}

/* Active submenu link styling */
.sidebar-submenu-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 3px solid #fff;
  font-weight: bold;
  padding-left: 25px;
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