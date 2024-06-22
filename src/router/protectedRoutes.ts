import useAuth from '@/stores/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

function handleRouteProtection(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  const localStore = localStorage.getItem('user');
  const auth = useAuth();

  if (auth.token) {
    if (requiresAuth) {
      if (auth.token) {
        next();
      } else {
        // console.log('Redirecting to login from protected route.');
        next('/login');
      }
    } else {
      next();
    }
  } else {
    if (requiresAuth) {
      next('/login');
    } else {
      next();
    }
  }
}

export default handleRouteProtection;
