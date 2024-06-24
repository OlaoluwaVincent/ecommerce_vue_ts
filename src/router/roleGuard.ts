import useAuth from '@/stores/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default function routeGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const auth = useAuth();
  const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  const requiredRole = to.meta.requiredRole as string | undefined;

  if (requiresAuth && !auth.token) {
    // Route requires authentication but user is not authenticated
    next('/login');
  } else if (requiredRole && auth.user?.role !== requiredRole) {
    // Route requires a specific role but user does not have that role
    next('/');
  } else {
    // No additional checks or all checks passed
    next();
  }
}
