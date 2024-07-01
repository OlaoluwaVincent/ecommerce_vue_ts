import type { OrdersWithPagination, OrderWithProducts } from '@/utils/typings';
import { handleRequest, handleSubmit } from './axios';

async function getOrders() {
  return await handleRequest<OrdersWithPagination>('get', 'orders/');
}
async function getUserOrders(id: string) {
  return await handleRequest<OrdersWithPagination>(
    'get',
    'orders/my-order/' + id
  );
}
async function getOrder(id: string) {
  return await handleRequest<OrderWithProducts>('get', `orders/${id}`);
}

async function updateOrderStatus(id: string, status: string) {
  return await handleSubmit('put', `orders/${id}`, { status: status });
}

export { getOrders, getUserOrders, getOrder, updateOrderStatus };
