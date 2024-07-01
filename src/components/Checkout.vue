<template>
  <form class="flex flex-col gap-4">
    <p>
      Price: <span>{{ cartStore.price }}</span>
    </p>
    <p>
      Discount: <span>{{ cartStore.discount }}</span>
    </p>
    <!-- <p>
      Tax: <span>{{ cartStore.tax }}</span>
    </p> -->

    <v-divider class="border-gray-600"></v-divider>
    <p class="text-lg uppercase font-bold">
      Total:
      <span>&#x20A6;{{ total.toFixed(2) }}</span>
    </p>
    <v-btn
      color="black"
      @click="handleClick"
      block
      :disabled="!cartStore.price || isPending"
      >Proceed to Checkout</v-btn
    >
    <!-- </Link> -->
  </form>
</template>

<script setup lang="ts">
  import useAuth from '@/stores/auth';
  import useCartStore from '@/stores/cart';
  import { initPayment } from '@/requests/payment';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useMutation } from '@tanstack/vue-query';

  const router = useRouter();
  const cartStore = useCartStore();
  const auth = useAuth();

  const total = computed(() => cartStore.price - cartStore.discount);

  const { mutate, isPending } = useMutation({
    mutationKey: ['initPayment'],
    mutationFn: initPayment,
    onSuccess: (data) => {
      window.location.href = data.authorization_url;
    },
  });

  async function handleClick() {
    if (!auth.token) router.push('/login?redirect=cart');
    mutate(cartStore.cart);
  }
</script>

<style scoped>
  p {
    display: flex;
    justify-content: space-between;
  }
</style>
