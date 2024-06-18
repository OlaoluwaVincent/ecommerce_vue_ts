import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

function handleRouteProtection(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  const localStore = localStorage.getItem('user');
  if (localStore) {
    const auth = JSON.parse(localStore);
    if (requiresAuth && !auth.token) {
      //? Redirect to login if trying to access protected route while not authenticated
      next('/login');
    } else if (to.path === '/login' && auth.token) {
      //? Redirect to users if trying to access login while authenticated
      next('/');
    }
  } else {
    next('/login'); // Continue navigation
  }
}

export default handleRouteProtection;
