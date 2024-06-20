// stores/productStore.ts
import type { ProductImages } from '@/utils/typings';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Product {
  id: string;
  name: string;
  images: ProductImages[];
  price: number | undefined;
  discount: number | undefined;
  description: string;
  quantity: number;
  userId: string | null;
}

export const useProductStore = defineStore(
  'product',
  () => {
    const product = ref<Product>();
    function setProduct(pro: Product) {
      product.value = pro;
    }

    return {
      product,
      setProduct,
    };
  },
  { persist: true }
);
