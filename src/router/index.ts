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
        props: true,
        meta: { title: 'Hacker News' }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Lấy params type để làm tiêu đề cho sinh động (ví dụ: news -> News)
  const type = to.params.type as string
  const pageTitle = type ? `Hacker News | ${type.charAt(0).toUpperCase() + type.slice(1)}` : 'Hacker News'

  document.title = pageTitle
  next()
})

export default router
