<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>

  <VueQueryDevtools />
</template>

<style scoped></style>