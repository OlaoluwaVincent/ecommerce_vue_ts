<script setup lang="ts">
import { getAllProducts } from '@/requests/product';
import Product from '../components/Product.vue';
import { onMounted, ref } from 'vue';
import type { ProductResponse } from '@/utils/typings';



const data = ref<ProductResponse>();

onMounted(async () => {
  return data.value = await getAllProducts()
})
</script>

<template>
  <main style="padding: 20px 5%;">
    <h1>Shop with <span id="logo">EasyShop</span></h1>
    <section class="products">
      <Product v-for="product in data?.data" :key="product.id" :product="product" />
    </section>
  </main>
</template>


<style scoped>
h1 {
  margin-bottom: 30px;
}

#logo {
  font-size: 36px;
  color: maroon;
  text-shadow: whitesmoke;
}

.products {
  display: grid;
  grid-template-columns: minmax(200px, 400px);
  gap: 20px;
}

@media (width>=540px) {
  .products {
    display: grid;
    grid-template-columns: repeat(2, minmax(200px, 400px));
    gap: 20px;
  }
}

@media (width>=768px) {
  .products {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 400px));
    gap: 20px;
  }
}

@media (width>=1024px) {
  .products {
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 400px));
    gap: 20px;
  }
}
</style>