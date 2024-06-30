<template>
    <div class="container">
        <Product v-for="product in products" :key="product.id" :productId="product.id" :owner="owner" />
    </div>
</template>

<script setup lang="ts">
import type { Contents } from '@/utils/typings';
import Product from '@/components/Product.vue';
import type { PropType } from 'vue';


const props = defineProps({
    products: {
        type: Array as PropType<Contents[]>,
        required: true,
    },
    owner: Boolean,
});
</script>

<style scoped>
/* .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
} */

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 20px;
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: repeat(3, minmax(0, 1fr))
    }
}

@media (min-width: 1024px) {
    .container {
        grid-template-columns: repeat(4, minmax(0, 1fr))
    }
}

@media (min-width: 1200px) {
    .container {
        grid-template-columns: repeat(5, minmax(0, 1fr))
    }
}
</style>
