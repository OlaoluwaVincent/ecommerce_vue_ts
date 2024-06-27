import type { AxiosError } from 'axios';
import axiosInstance from './axios';
import { reactive } from 'vue';
import type {
  DataAndPagination,
  PResponse,
  Product,
  ProductResponse,
} from '@/utils/typings';

async function getAllProducts() {
  const response = reactive<ProductResponse>({
    isLoading: true,
    error: '',
    data: {} as any,
  });
  try {
    const res = await axiosInstance.get('products');
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
async function getProduct(id: string) {
  const response = reactive<PResponse>({
    isLoading: true,
    error: '',
    data: {} as any,
  });
  try {
    const res = await axiosInstance.get('products/' + id);
    if (!res.data) {
      throw new Error('Please try again later');
    }
    response.data = res.data as Product;
  } catch (error: any) {
    const error_axios = error as AxiosError;
    response.error = error_axios.response?.data as string;
  } finally {
    response.isLoading = false;
  }

  return response;
}
async function getUserProducts(id: string) {
  const response = reactive<ProductResponse>({
    isLoading: true,
    error: '',
    data: {} as any,
  });
  try {
    const res = await axiosInstance.get('products/user/' + id);
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

async function createProduct(data: FormData) {
  const response = reactive({
    isLoading: true,
    error: '',
    data: null,
  });

  try {
    const res = await axiosInstance.post('products', data);
    if (!res.data) {
      throw new Error('Please try again later');
    }
    response.data = res.data;
  } catch (error: any) {
    response.error = error.response?.data?.message as string;
  } finally {
    response.isLoading = false;
  }

  return response;
}
async function updateProduct(data: FormData, id: string) {
  const response = reactive({
    isLoading: true,
    error: '',
    data: null,
  });

  try {
    const res = await axiosInstance.put('products/' + id, data);
    if (!res.data) {
      throw new Error('Please try again later');
    }
    response.data = res.data;
  } catch (error: any) {
    response.error = error.response?.data?.message as string;
  } finally {
    response.isLoading = false;
  }

  return response;
}

async function deleteProduct(id: string) {
  const response = reactive({
    isLoading: true,
    error: '',
    data: '',
  });

  try {
    const res = await axiosInstance.delete('products/' + id);
    if (!res.data) {
      throw new Error('Please try again later');
    }
    response.data = res.data.message;
  } catch (error: any) {
    response.error = error.response?.data?.message as string;
  } finally {
    response.isLoading = false;
  }

  return response;
}

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
};
