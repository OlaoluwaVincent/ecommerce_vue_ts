import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import handleRouteProtection from './protectedRoutes';
import Dashboard from '@/views/Dashboard.vue';
import Create from '@/views/Create.vue';

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
      name: 'dashboard',
      component: Dashboard,
      meta: { layout: DefaultLayout, requiresAuth: true },
      beforeEnter: (to, from, next) => handleRouteProtection(to, next),
    },
    {
      path: '/edit',
      name: 'edit',
      component: Create,
      meta: { layout: DefaultLayout, requiresAuth: true },
      beforeEnter: (to, from, next) => handleRouteProtection(to, next),
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { layout: DefaultLayout, requiresAuth: true },
      beforeEnter: (to, from, next) => handleRouteProtection(to, next),
    },
    // {
    //   path: '/orders',
    //   name: 'orders',
    //   component: Dashboard,
    //   meta: { layout: DefaultLayout, requiresAuth: true },
    //   beforeEnter: (to, from, next) => handleRouteProtection(to, next),
    // },
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
