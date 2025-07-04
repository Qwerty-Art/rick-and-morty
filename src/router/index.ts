import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:id',
    name: 'id',
    component: () => import('../views/Item.vue')
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
