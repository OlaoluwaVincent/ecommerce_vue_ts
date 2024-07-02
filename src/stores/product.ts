// stores/productStore.ts
import type { Product, ProductImages } from '@/utils/typings';
import { defineStore } from 'pinia';
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
      setProduct,
      emptyProduct,
      increaseQuantity,
      decreaseQuantity,
    };
  },
  { persist: true }
);
