import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/orders/add'
    },
    {
      path: '/orders/all-orders',
      name: 'all-orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/orders/add',
      name: 'add-order',
      component: () => import('../views/AddOrdersView.vue')
    },
    {
      path: '/orders/create-receipt',
      name: 'create-receipt',
      component: () => import('../views/AddReceiptView.vue')
    },
    {
      path: '/products/add',
      name: 'add-products',
      component: () => import('../views/AddProductsView.vue')
    },
    {
      path: '/products/all-products',
      name: 'all-products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/organizations/add',
      name: 'add-organizations',
      component: () => import('../views/AddOrganizationsView.vue')
    },
    {
      path: '/organizations/all-organizations',
      name: 'all-organizations',
      component: () => import('../views/OrganizationsView.vue')
    }
  ],
})

export default router