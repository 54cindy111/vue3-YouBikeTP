//Layout
import MainLayout from '@/Layout/Main.vue'
//Pages
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: { title: 'Home' },
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        meta: { title: 'Home' },
        component: Home
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('@/views/ErrPage.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
