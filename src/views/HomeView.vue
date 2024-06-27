<script setup lang="ts">
import { getAllProducts } from '@/requests/product';
import Products from '../components/Products.vue';
import { onMounted, ref } from 'vue';



const data = ref();
const navigation = ref()

onMounted(async () => {
  const res = await getAllProducts()
  data.value = res.data.products;
  navigation.value = res.data.pagination;
})
</script>

<template>
  <main>
    <h1 class="logo-h1">Shop with <span id="logo">EasyShop</span></h1>
    <Products v-if="data" :products="data" />
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