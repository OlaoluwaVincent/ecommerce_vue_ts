<template>
  <article
    class="flex gap-2 p-5 rounded-lg w-full bg-gray-900 text-slate-200 items-center">
    <div class="min-w-[100px] w-[100px]">
      <v-img
        aspect-ratio="1"
        cover
        :src="product.images[0].url"
        :alt="product.name"></v-img>
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex gap-2 justify-between">
        <p :class="discount && 'line-through'">&#x20A6;{{ product.price }}</p>
        <p class="font-bold">
          &#x20A6;{{ discount ? discount : product.price }}
        </p>
      </div>
      <div class="flex gap-2 justify-between">
        <p class="font-bold">{{ product.name }}</p>
        <v-btn
          color="error"
          @click="cartStore.removeFromCart(product.id)"
          class="justify-self-end">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <div
        v-if="product.quantity > 1"
        class="flex justify-between w-max gap-4 items-center">
        <v-btn
          flat
          icon
          rounded="lg"
          color="primary"
          @click="cartStore.increaseQuantity(product.id)">
          <v-icon :size="$vuetify.display.mdAndDown ? 24 : 30">mdi-plus</v-icon>
        </v-btn>
        {{ product.originalQuantity }}
        <v-btn
          flat
          icon
          rounded="lg"
          color="primary"
          @click="cartStore.decreaseQuantity(product.id)">
          <v-icon :size="$vuetify.display.mdAndDown ? 24 : 30"
            >mdi-minus</v-icon
          >
        </v-btn>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import useCartStore from '@/stores/cart';
  import type { Product } from '@/utils/typings';
  import { computed } from 'vue';
  const cartStore = useCartStore();

  interface Pro extends Product {
    originalQuantity: number;
  }

  const props = defineProps<{
    product: Pro;
  }>();

  const discount = computed(() => {
    if (props.product.price && props.product.discount) {
      return (
        props.product.price -
        props.product.price * (props.product.discount / 100)
      );
    }
  });
</script>

<style scoped></style>
