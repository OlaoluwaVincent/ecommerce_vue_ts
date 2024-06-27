import type { DataAndPagination, ProductResponse } from '@/utils/typings';
import { reactive } from 'vue';
import axiosInstance from './axios';
import type { AxiosError } from 'axios';

async function getAllProducts() {
  const response = reactive<ProductResponse>({
    isLoading: true,
    error: '',
    data: {} as any,
  });
  try {
    const res = await axiosInstance.get('orders');
    if (!res.data) {
      throw new Error('Please try again later');
    }
    response.data = res.data as DataAndPagination;
  } catch (error: any) {
    const error_axios = error as AxiosError;
    response.error = error_axios.response?.data as string;
  } finally {
    response.isLoading = false;
  }

  return response;
}
