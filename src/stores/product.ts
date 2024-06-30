// stores/productStore.ts
import type { Product, ProductImages } from '@/utils/typings';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore(
  'product',
  () => {
    const product = ref<Product>();

    function setProduct(pro: Product) {
      product.value = pro;
    }

    function emptyProduct() {
      product.value = undefined;
    }

    return {
      product,
      setProduct,
      emptyProduct,
    };
  },
  { persist: true }
);
