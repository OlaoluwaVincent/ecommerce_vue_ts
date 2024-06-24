<script setup lang="ts">
import { getAllProducts } from '@/requests/product';
import Product from '../components/Product.vue';
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
  <main style="padding: 20px 5%;">
    <h1 class="logo-h1">Shop with <span id="logo">EasyShop</span></h1>
    <section class="products">
      <Product v-for="product in data" :key="product.id" :product="product" />
    </section>
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

.products {
  display: grid;
  grid-template-columns: minmax(100%, 200px);
  gap: 20px;
  place-items: center;
}

@media (width>=540px) {
  .products {
    display: grid;
    grid-template-columns: repeat(2, minmax(220px, 400px));
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