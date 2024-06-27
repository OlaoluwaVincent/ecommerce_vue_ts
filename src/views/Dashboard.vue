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
import { getUserProducts } from '@/requests/product';
import useAuth from '@/stores/auth';
import type { DataAndPagination, Pagination, Product as ProductType } from '@/utils/typings';
import { onMounted, ref } from 'vue';

const auth = useAuth()
const data = ref<ProductType[]>([]);
const navigation = ref<Pagination>();

onMounted(async () => {
    let res: { data: DataAndPagination };
    if (auth.user?.role === "ADMIN") {
        res = await getUserProducts(auth.user!.id)
    } else {
        //GET Orders
        res = await getUserProducts(auth.user!.id)
    }
    data.value = res.data.products;
    navigation.value = res.data.pagination;
})
</script>

<style scoped></style>
