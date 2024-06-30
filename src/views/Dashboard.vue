<template>
    <v-container class="pa-0">
        <h3 class="text-center font-bold text-red-900 text-xl mb-5">
            My Products
        </h3>

        <Products :products="data" owner />
    </v-container>

</template>
<script setup lang="ts">
import Products from '@/components/Products.vue';
import useAuth from '@/stores/auth';
import type { Pagination, Product as ProductType } from '@/utils/typings';
import { onMounted, ref } from 'vue';

const auth = useAuth()
const data = ref<ProductType[]>([]);
const navigation = ref<Pagination>();


</script>

<style scoped></style>
