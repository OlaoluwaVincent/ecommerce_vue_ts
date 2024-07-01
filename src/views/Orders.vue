<template>
  <v-container>
    <h1 class="text-h4">My Orders</h1>
    <p
      v-if="isLoading"
      class="animate-pulse font-bold">
      Loading...
    </p>
    <p
      v-else-if="isError"
      class="text-red-500">
      {{ error?.message }}
    </p>
    <section v-if="data">
      <OrderCard
        v-for="order in data.orders"
        :key="order.id"
        :orderId="order.id" />
    </section>
  </v-container>
</template>

<script setup lang="ts">
  import useAuth from '@/stores/auth';
  import { useQuery } from '@tanstack/vue-query';
  import { getOrders, getUserOrders } from '@/requests/orders';
  import OrderCard from '@/components/OrderCard.vue';

  const auth = useAuth();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: auth.isAdmin ? getOrders : () => getUserOrders(auth.user!.id),
    // queryFn: () => getUserOrders(auth.user!.id),
  });
</script>

<style scoped></style>
