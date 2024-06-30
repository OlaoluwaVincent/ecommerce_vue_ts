import { handleRequest, handleSubmit } from './axios';
import type { Product, ProductsWithPagination } from '@/utils/typings';

// Specific API calls using the wrappers
async function getAllProducts() {
  return await handleRequest<ProductsWithPagination>('get', 'products');
}

async function getProduct(id: string) {
  return await handleRequest<Product>('get', `products/${id}`);
}

async function createProduct(data: FormData) {
  return await handleSubmit('post', 'products', data);
}

async function updateProduct(data: FormData, id: string) {
  return await handleSubmit('put', `products/${id}`, data);
}

async function deleteProduct(id: string) {
  return await handleRequest<string>('delete', `products/${id}`);
}

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
