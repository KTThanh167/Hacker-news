import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewestView from '../views/NewestView.vue'
import AskView from '../views/AskView.vue'
import ShowView from '../views/ShowView.vue'
import JobView from '../views/JobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/newest',
    //   name: 'newest',
    //   component: NewestView,
    // },
    // {
    //   path: '/ask',
    //   name: 'ask',
    //   component: AskView,
    // },
    // {
    //   path: '/show',
    //   name: 'show',
    //   component: ShowView,
    // },
    // {
    //   path: '/jobs',
    //   name: 'jobs',
    //   component: JobView,
    // },
    {
      path: '/:type', // Tham số động :type
      name: 'feed',
      component: () => import('@/views/FeedView.vue'),
      props: true // Truyền tham số từ URL vào component như một Props
    }
  ],
})

export default router
