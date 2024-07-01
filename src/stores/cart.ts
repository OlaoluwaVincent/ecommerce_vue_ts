import type { Product } from '@/utils/typings';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface Pro extends Product {
  originalQuantity: number;
}

const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref<Pro[]>([]);
    const cartLength = computed(() => cart.value.length);

    const price = computed(() => {
      if (cart.value.length) {
        const totalPrice = cart.value.reduce(
          (acc, product) => acc + product.price * product.originalQuantity,
          0
        );
        return totalPrice;
      }
      return 0;
    });

    const discount = computed(() => {
      if (cart.value.length) {
        const totalDiscount = cart.value.reduce((acc, product) => {
          if (product.discount) {
            return (
              acc +
              ((product.price * product.discount) / 100) *
                product.originalQuantity
            );
          }
          return acc;
        }, 0);
        return totalDiscount;
      }
      return 0;
    });

    // const tax = computed(() => {
    //   const taxRate: number = 0.075;
    //   if (!price.value) return 0;
    //   if (discount.value) {
    //     return parseFloat(
    //       (taxRate * (price.value - discount.value)).toFixed(2)
    //     );
    //   }
    //   return parseFloat((taxRate * price.value).toFixed(2));
    // });

    function addToCart(value: Product) {
      const existingProduct = cart.value.find(
        (product) => product.id === value.id
      );
      if (existingProduct) {
        return;
      }
      cart.value.push({ ...value, originalQuantity: 1 });
    }

    function removeFromCart(id: string) {
      cart.value = cart.value.filter((item) => item.id !== id);
    }

    function increaseQuantity(id: string) {
      const product = cart.value.find((item) => item.id === id);
      if (product && product.quantity > product.originalQuantity) {
        product.originalQuantity++;
      }
    }

    function decreaseQuantity(id: string) {
      const product = cart.value.find((item) => item.id === id);
      if (product && product.originalQuantity > 1) {
        product.originalQuantity--;
      }
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
      // tax,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      checkExisting,
      clearCart,
    };
  },
  { persist: true }
);

export default useCartStore;
