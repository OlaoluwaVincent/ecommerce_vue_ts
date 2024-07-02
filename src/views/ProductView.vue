<template>
  <section class="d-flex flex-col gap-5 max-w-[500px] mx-auto">
    <h1 class="text-center text-h4">{{ product?.name }}</h1>
    <p class="text-h5 whitespace-pre">{{ product?.description }}</p>
    <p class="text-body-1">Available Quantity: {{ product?.quantity }}</p>

    <div class="grid grid-cols-2 gap-3 sm:max-w-[500px] w-full mx-auto">
      <v-img
        v-for="img in product?.images"
        :key="img.public_id"
        aspect-ratio="1"
        cover
        :src="img.url" />
    </div>

    <div
      v-if="product"
      class="flex gap-5 mx-auto">
      <v-btn
        v-if="!auth.isAdmin"
        elevated
        rounded="sm"
        :disabled="isPending"
        color="success"
        @click="handlePayment">
        Buy Now
      </v-btn>

      <v-btn
        v-if="auth.isAdmin"
        prepend-icon="mdi-pencil"
        elevated
        rounded="sm"
        color="warning"
        @click="setProductAndNavigateEdit">
        Edit
      </v-btn>

      <v-btn
        v-if="auth.isAdmin"
        elevated
        prepend-="mdi-delete"
        rounded="sm"
        color="error"
        @click="deletePro">
        Delete
      </v-btn>

      <v-btn
        v-if="!exists && !auth.isAdmin"
        elevated
        rounded="sm"
        color="primary"
        @click="addToCart(product)">
        Add to cart
      </v-btn>

      <v-btn
        v-if="exists && !auth.isAdmin"
        elevated
        rounded="sm"
        color="error"
        @click="removeFromCart(product.id)">
        Remove from cart
      </v-btn>
    </div>

    <p class="text-decoration-underline text-center mt-10">Quantity to Order</p>
    <div class="flex justify-between w-max gap-4 items-center mx-auto">
      <v-btn
        flat
        icon
        color="primary"
        @click="productStore.increaseQuantity()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      {{ product?.originalQuantity }}
      <v-btn
        flat
        icon
        color="primary"
        @click="productStore.decreaseQuantity()">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useProductStore } from '@/stores/product';
  import { computed, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { deleteProduct } from '@/requests/product';
  import { initPayment } from '@/requests/payment';
  import { useMutation } from '@tanstack/vue-query';
  import useAuth from '@/stores/auth';
  import useCartStore from '@/stores/cart';

  const { addToCart, checkExisting, removeFromCart } = useCartStore();
  const productStore = useProductStore();
  const router = useRouter();
  const route = useRoute();
  const auth = useAuth();

  const product = productStore.product;
  const exists = computed(() => checkExisting(productStore.product!.id));

  //   onUnmounted(() => {
  //     productStore.emptyProduct();
  //   });

  const setProductAndNavigateEdit = () => {
    router.push({ name: 'edit' });
  };

  function deletePro() {
    deleteProduct(productStore.product!.id);
    router.push({ name: 'dashboard' });
  }

  const { isPending, mutate } = useMutation({
    mutationKey: ['initPayment'],
    mutationFn: initPayment,
    onSuccess: (data) => {
      window.location.href = data.authorization_url;
    },
  });

  async function handlePayment() {
    if (!auth.token) router.push('/login?redirect=' + route.path);
    if (productStore.product) mutate([productStore.product]);
  }
</script>
