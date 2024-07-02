import type { Product } from '@/utils/typings';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { ref } from 'vue';

interface Pro extends Product {
  originalQuantity: number;
}

export const useProductStore = defineStore(
  'product',
  () => {
    const product = ref<Pro>();

    function setProduct(pro: Product) {
      product.value = { ...pro, originalQuantity: 1 };
    }

    function emptyProduct() {
      product.value = undefined;
    }

    const discount = computed(() => {
      if (product.value?.discount) {
        const d =
          ((product.value.price * product.value.discount) / 100) *
          product.value.originalQuantity;
        return d;
      }
      return 0;
    });

    function increaseQuantity() {
      if (!product.value) return;
      if (product && product.value.quantity > product.value.originalQuantity) {
        product.value.originalQuantity++;
      }
    }

    function decreaseQuantity() {
      if (!product.value) return;
      if (product && product.value.originalQuantity > 1) {
        product.value.originalQuantity--;
      }
    }

    return {
      product,
      discount,
      setProduct,
      emptyProduct,
      increaseQuantity,
      decreaseQuantity,
    };
  },
  { persist: true }
);
