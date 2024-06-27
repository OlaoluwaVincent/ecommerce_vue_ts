<template>
    <div class="flex flex-wrap gap-5">
        <Product v-for="product in products" :key="product.id" :product="product" :owner="owner" />
    </div>
</template>

<script setup lang="ts">
import type { Product as ProductType } from '@/utils/typings';
import Product from '@/components/Product.vue';
import type { PropType } from 'vue';

const props = defineProps({
    products: {
        type: Array as PropType<ProductType[]>,
        required: true,
    },
    owner: Boolean,
});
</script>

<!-- <style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}

@media (min-width: 768px) {
    .container {
        justify-content: flex-start;
    }
}
</style> -->
