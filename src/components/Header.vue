<template>
  <nav class="header">
    <div class="nav-items first">
      <RouterLink
        to="/"
        class="nav-link !text-base"
        ><v-icon>mdi-home</v-icon></RouterLink
      >
      <RouterLink
        v-if="auth.token"
        to="/dashboard"
        class="nav-link !text-base">
        <v-icon>mdi-view-dashboard</v-icon>
      </RouterLink>
      <RouterLink
        v-if="auth.token"
        to="/order"
        class="nav-link !text-base">
        <v-icon>mdi-shopping-search</v-icon>
      </RouterLink>

      <RouterLink
        to="/cart"
        class="nav-link !text-base">
        <v-badge
          color="blue"
          :content="cartStore.cartLength">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </RouterLink>
    </div>

    <div class="nav-items">
      <RouterLink
        v-if="!auth.token"
        to="/login"
        class="nav-link"
        >Login</RouterLink
      >
      <RouterLink
        v-if="!auth.token"
        to="/register"
        class="nav-link"
        >Register</RouterLink
      >

      <v-btn
        v-if="auth.token"
        variant="text"
        @click="handleLogout"
        class="!text-sm"
        color="blue-darken-4"
        >Logout</v-btn
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
  import useAuth from '@/stores/auth';
  import useCartStore from '../stores/cart';
  import { useRouter } from 'vue-router';
  const cartStore = useCartStore();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };
</script>

<style scoped>
  .header {
    height: 100px;
    border-bottom: 2px solid gray;
    display: flex;
    gap: 40px;
    justify-content: space-between;
    align-items: center;
    margin-inline: auto;
    width: 100%;
    text-align: center;
    padding-inline: 5%;
  }

  .nav-items {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .nav-link {
    text-align: center;
    text-decoration: none;
    color: maroon;
    /* font-size: 16px; */
    z-index: 10;
    position: relative;
    padding: 8px;
  }

  .router-link-exact-active {
    border: 1px dotted maroon;
  }

  @media (width>=768px) {
    .nav-items {
      gap: 20px;
    }

    .nav-link {
      font-size: 24px;
      padding: 8px 16px;
    }
  }
</style>
