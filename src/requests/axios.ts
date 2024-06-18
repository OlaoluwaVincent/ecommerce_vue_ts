import axios, { type AxiosInstance } from 'axios';
import useAuth from '@/stores/auth';

const authStore = useAuth();

// Create an Axios instance with default configurations
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_URLL as string,
});

// Add a request interceptor to include Bearer token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
