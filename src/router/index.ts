import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Create from '@/views/Create.vue';
import Edit from '@/views/Edit.vue';
import Orders from '@/views/Orders.vue';
import routeGuard from './roleGuard';
import DashboardLayout from '@/layout/DashboardLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: DefaultLayout },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { layout: DefaultLayout, requiresAuth: true },
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      beforeEnter: routeGuard,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          beforeEnter: routeGuard,
        },
        {
          path: '/edit',
          name: 'edit',
          component: Edit,
          meta: { requiredRole: 'ADMIN' },
        },
        {
          path: '/create',
          name: 'create',
          meta: { requiredRole: 'ADMIN' },
          component: Create,
        },
        {
          path: '/order',
          name: 'orders',
          component: Orders,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { layout: AuthLayout },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { layout: AuthLayout },
    },
  ],
});

export default router;
