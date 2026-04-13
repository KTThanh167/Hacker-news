import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewestView from '../views/NewestView.vue'
import AskView from '../views/AskView.vue'
import ShowView from '../views/ShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/newest',
      name: 'newest',
      component: NewestView,
    },
    {
      path: '/ask',
      name: 'ask',
      component: AskView,
    },
    {
      path: '/show',
      name: 'show',
      component: ShowView,
    },
  ],
})

export default router
