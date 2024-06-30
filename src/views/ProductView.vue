<template>
    <h1>{{ product?.name }}</h1>
    <p>{{ product?.description }}</p>
    <p>{{ product?.quantity }}</p>
</template>

<script setup lang='ts'>
import { useProductStore } from '@/stores/product';
import { onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const productStore = useProductStore()

const product = productStore.product;

onUnmounted(() => {
    productStore.emptyProduct()
})
</script>
