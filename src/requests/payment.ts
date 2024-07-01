import { reactive } from 'vue';
import type { PaymentResponseData, Product } from '../utils/typings';
import axiosInstance from './axios';

async function initPayment(data: Product[]) {
  const response = reactive<PaymentResponseData>({
    isLoading: true,
    error: '',
    data: {} as any,
  });
  try {
    const res = await axiosInstance.post('payment/init', { products: data });
    if (!res.data.authorization_url) {
      throw new Error('Please try again later');
    }
    response.data = res.data;
  } catch (error: any) {
    response.error = error.message || (error.response?.data as string);
  } finally {
    response.isLoading = false;
  }

  return response;
}

export { initPayment };
