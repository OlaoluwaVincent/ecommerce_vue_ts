import type { OrdersWithPagination } from '@/utils/typings';
import { handleRequest } from './axios';

async function getOrders() {
  return await handleRequest<OrdersWithPagination>('get', 'orders/my-order');
}

export { getOrders };
