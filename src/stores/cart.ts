import type { Product } from '@/utils/typings';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref<Product[] | []>([]);
    const cartLength = computed(() => cart.value.length);

    const price = computed(() => {
      if (cart.value.length) {
        const totalPrice = cart.value.reduce(
          (acc, product) => acc + product.amount,
          0
        );
        return totalPrice;
      }
      return 0;
    });

    const discount = computed(() => {
      if (cart.value.length) {
        const totalPrice = cart.value.reduce((acc, product) => {
          if (product.discount) {
            return acc + product.discount;
          }
          return acc;
        }, 0);
        return totalPrice.toFixed(2);
      }
    });

    const tax = computed(() => {
      const taxRate: number = 0.075;
      return (taxRate * price?.value).toFixed(2);
    });

    function addToCart(value: Product) {
      if (checkExisting(value.id)) return;
      cart.value.push(value);
    }

    function removeFromCart(id: string) {
      cart.value = cart.value.filter((item) => item.id !== id);
    }

    function checkExisting(id: string) {
      if (cart.value !== undefined && cart.value.length > 0) {
        const index = cart.value.findIndex((item) => item.id === id);
        return index >= 0;
      }

      return false;
    }

    function clearCart() {
      cart.value = [];
    }

    return {
      cartLength,
      cart,
      discount,
      price,
      tax,
      addToCart,
      removeFromCart,
      checkExisting,
      clearCart,
    };
  },
  { persist: true }
);

export default useCartStore;
