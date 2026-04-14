import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/Layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '', // Khi đường dẫn là "/"
        redirect: '/news' // Tự động nhảy sang "/news"
      },
      {
        path: '/:type',
        name: 'feed',
        component: () => import('@/views/FeedView.vue'),
        props: true
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
