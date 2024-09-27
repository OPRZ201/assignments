import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: MainView
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateAssignment.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/assignment/:id",
      name: "assignment",
      component: () => import("../views/AssignmentView.vue"),
    }
  ]
})

export default router
