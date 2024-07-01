import type { PaymentResponseData, Product } from '../utils/typings';
import { handleSubmit } from './axios';

async function initPayment(data: Product[]) {
  return await handleSubmit<PaymentResponseData>('post', 'payment/init', {
    products: data,
  });
}

export { initPayment };
