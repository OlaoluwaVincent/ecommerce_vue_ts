<template>
    <h3 class="text-center font-bold text-red-900 text-xl my-5">
        My Products
    </h3>
    <main style="padding: 20px 5%;">
        <section class="products">
            <Product v-for="product in data?.data" :key="product.id" :product="product" owner />
        </section>
    </main>
    <section>
        <router-view />
    </section>
</template>

<script setup lang="ts">
import Product from '@/components/Product.vue';
import { getUserProducts } from '@/requests/product';
import useAuth from '@/stores/auth';
import type { ProductResponse } from '@/utils/typings';
import { onMounted, ref } from 'vue';

const auth = useAuth()
const data = ref<ProductResponse>();

onMounted(async () => {
    return data.value = await getUserProducts(auth.user!.id)
})
</script>

<style scoped></style>