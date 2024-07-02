<template>
  <div v-if="!data?.id">loading...</div>
  <v-card
    v-else
    max-width="200"
    elevation="16"
    class="!relative">
    <v-card-text class="!relative pa-1 group">
      <v-img
        aspect-ratio="1"
        cover
        :src="data.images[0].url" />

      <div
        class="absolute hidden group-hover:flex w-full z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 gap-5 px-3 pb-5 bg-slate-400/40 h-full justify-center align-center ps-4">
        <v-btn
          v-if="!exists"
          icon
          elevated
          rounded="sm"
          color="primary"
          @click="addToCart(data)">
          <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-btn
          v-if="exists"
          icon
          elevated
          rounded="sm"
          color="error"
          @click="removeFromCart(data.id)">
          <v-icon>mdi-cart-off</v-icon>
        </v-btn>
      </div>
    </v-card-text>

    <v-card-title
      @click="setProductAndNavigateProduct"
      class="pb-1 !text-sm !sm:text-base !lg:text-[20px] cursor-pointer">
      {{ data.name }}
    </v-card-title>

    <v-card-subtitle class="d-flex gap-4 text-gray-900 pb-2">
      <h5
        class="font-bold"
        :class="discount && 'line-through opacity-80'">
        &#x20A6; {{ data.price }}
      </h5>
      <p
        v-if="discount"
        class="font-semibold">
        &#x20A6; {{ discount }}
      </p>
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import useCartStore from '../stores/cart';
  import { useProductStore } from '@/stores/product';
  import { useRouter } from 'vue-router';
  import { getProduct } from '@/requests/product';
  import { useQuery } from '@tanstack/vue-query';

  const { addToCart, checkExisting, removeFromCart } = useCartStore();
  const productStore = useProductStore();
  const router = useRouter();

  const props = defineProps({
    productId: {
      type: String,
      required: true,
    },
  });

  const { data } = useQuery({
    queryKey: ['product', props.productId],
    queryFn: () => getProduct(props.productId),
  });

  const exists = computed(() => checkExisting(data.value!.id));

  const discount = computed(() => {
    if (data.value!.price && data.value!.discount) {
      return (
        data.value!.price - data.value!.price * (data.value!.discount / 100)
      );
    }
  });

  const setProductAndNavigateProduct = () => {
    productStore.setProduct(data.value!);
    router.push({ name: 'product', params: { id: data.value?.id } });
  };
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    mix-blend-mode: exclusion;
  }
</style>
