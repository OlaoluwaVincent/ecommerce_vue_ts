import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

function handleRouteProtection(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  const localStore = localStorage.getItem('user');

  if (localStore) {
    const { user } = JSON.parse(localStore);
    if (requiresAuth) {
      if (user && user.token) {
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
      // console.log('Redirecting to login from protected route.');
      next('/login');
    } else {
      next();
    }
  }
}

export default handleRouteProtection;
