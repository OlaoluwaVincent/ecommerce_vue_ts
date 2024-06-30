<script setup lang="ts">
import { getAllProducts } from '@/requests/product';
import Products from '../components/Products.vue';
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query'



const navigation = ref()

// onMounted(async () => {
const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: getAllProducts,
})


</script>

<template>
  <main>
    <h1 class="logo-h1">Shop with <span id="logo">EasyShop</span></h1>
    <v-container v-if="isLoading" class="animate-pulse text-slate-600 font-semibold">Loading...</v-container>
    <Products v-if="data" :products="data.products" />
  </main>
</template>


<style>
.logo-h1 {
  margin-bottom: 30px;
}

#logo {
  font-size: 36px;
  color: maroon;
  text-shadow: whitesmoke;
}
</style>