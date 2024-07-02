<template>
  <v-container
    d-flex
    class="sidebar ma-0 !w-full md:!w-[250px] bg-gray-900 justify-evenly md:justify-normal">
    <div>
      <h3 class="text-white font-bold text-center my-5 capitalize">
        {{ auth.user?.username }}
      </h3>
    </div>
    <div class="hidden md:flex flex-col gap-5">
      <RouterLink
        :to="{ name: 'dashboard' }"
        class="link">
        Dashboard
      </RouterLink>
      <RouterLink
        v-if="auth.isAdmin"
        :to="{ name: 'create' }"
        class="link">
        Create
      </RouterLink>
      <RouterLink
        :to="{ name: 'orders' }"
        class="link">
        Orders
      </RouterLink>
    </div>

    <div class="flex md:hidden flex-row md:flex-col gap-5">
      <RouterLink
        :to="{ name: 'dashboard' }"
        class="link-icon">
        <v-icon
          color="blue-darken-2"
          size="36"
          >mdi-view-dashboard</v-icon
        >
      </RouterLink>
      <RouterLink
        v-if="auth.isAdmin"
        :to="{ name: 'create' }"
        class="link-icon">
        <v-icon
          color="blue-darken-2"
          size="36"
          >pen-plus</v-icon
        >
      </RouterLink>
      <RouterLink
        :to="{ name: 'orders' }"
        class="link-icon">
        <v-icon
          color="blue-darken-2"
          size="36"
          >mdi-shopping-search</v-icon
        >
      </RouterLink>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import useAuth from '@/stores/auth';
  const auth = useAuth();
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    height: max-content;
    border-radius: 16px;
    gap: 12px;
    text-align: left;
  }

  @media (width >=768px) {
    .sidebar {
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      height: max-content;
      min-height: 400px;
      border-radius: 16px;
      gap: 12px;
      text-align: left;
    }
  }
  .link {
    @apply text-gray-900 font-semibold capitalize hover:ml-2 transition-all duration-300 text-left block w-full rounded-lg p-2 bg-white;
  }
  .link-icon {
    @apply text-gray-900 font-semibold capitalize hover:ml-2 transition-all duration-300 text-left rounded-lg p-2 bg-white w-max h-max;
  }

  .router-link-exact-active {
    @apply bg-blue-500 text-white;
  }
  .router-link-exact-active.link-icon {
    @apply bg-blue-200;
  }
</style>
