<template>
    <v-container>
        <h1> Orders page</h1>
        <p v-if="isLoading" class="animate-pulse font-bold">Loading...</p>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/stores/auth';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { getOrders } from '@/requests/orders'

const auth = useAuth()
const isAdmin = computed(() => auth.user?.role === 'ADMIN')

const { isLoading, isError, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
})
console.log(data.value)
</script>

<style scoped></style>