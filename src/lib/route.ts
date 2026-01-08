import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Define your route types
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home.vue'),
  },
  {
    path:'/preview',
    name:'Preview',
    component: () => import('@/pages/preview.vue')
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
