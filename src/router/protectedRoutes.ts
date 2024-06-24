import useAuth from '@/stores/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default function handleRouteProtection(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  const auth = useAuth();

  if (requiresAuth && !auth.token) {
    next('/login');
  } else {
    next();
  }
}
