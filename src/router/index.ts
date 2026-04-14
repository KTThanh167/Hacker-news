import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/Layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
    {
      path: '/:type', // Tham số động :type
      name: 'feed',
      component: () => import('@/views/FeedView.vue'),
      props: true // Truyền tham số từ URL vào component như một Props
    }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
