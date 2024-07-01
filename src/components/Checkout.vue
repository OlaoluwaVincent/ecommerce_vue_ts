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
      :disabled="!cartStore.price"
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

  const router = useRouter();

  const cartStore = useCartStore();
  const isLoading = ref(false);

  const auth = useAuth();
  const total = computed(() => cartStore.price - cartStore.discount);

  async function handleClick() {
    if (!auth.user) {
      return router.push('/login?redirect=cart');
    }
    // console.log(cartStore.cart)
    const res = await initPayment(cartStore.cart);
    if (res.error) {
      return alert(res.error);
    }
    window.location.href = res.data.authorization_url;
    isLoading.value = res.isLoading;
  }
</script>

<style scoped>
  p {
    display: flex;
    justify-content: space-between;
  }
</style>
