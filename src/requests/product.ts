import type { AxiosError } from 'axios';
import axiosInstance from './axios';
import { reactive } from 'vue';
import type { ProductResponse } from '@/utils/typings';

async function getAllProducts() {
  const response = reactive<ProductResponse>({
    isLoading: true,
    error: '',
    data: [],
  });
  try {
    const res = await axiosInstance.get('products');
    if (!res.data) {
      throw new Error('Please try again later');
    }
    response.data = res.data;
  } catch (error: any) {
    const error_axios = error as AxiosError;
    response.error = error_axios.response?.data as string;
  } finally {
    response.isLoading = false;
  }

  return response;
}

export { getAllProducts };
