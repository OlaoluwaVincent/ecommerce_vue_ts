import useAuth from '@/stores/auth';
import { jwtDecode } from 'jwt-decode';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import { reactive } from 'vue';
import type { RequestResponseType, ResponseData } from '@/utils/typings';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_LOCAL_URL
    : import.meta.env.VITE_BACKEND_URL,
});

// Function to refresh token
async function refreshToken(refreshToken: string) {
  const auth = useAuth();
  const response = await axiosInstance.post('/users/refresh-token', {
    refreshToken,
  });

  if (response.data) {
    auth.setUser(response.data);
    return true;
  }

  return false;
}

let isRefreshing = false;
let refreshPromise: Promise<any> | null;

axiosInstance.interceptors.request.use(
  async (config) => {
    const auth = useAuth();
    const token = auth.token;
    const refresh_token = auth.refreshToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Only attach token if it exists
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      const fiveMinutes = 1 * 60 * 1000;

      if (timeUntilExpiration < fiveMinutes && !isRefreshing) {
        isRefreshing = true;

        const res = await refreshToken(refresh_token!);
        if (res) {
          isRefreshing = false;
          refreshPromise = null;
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export async function handleRequest<T>(method: 'get' | 'delete', url: string) {
  try {
    const res = await axiosInstance[method](url);
    if (!res.data) {
      throw new Error('Please try again later');
    }
    // response.data = res.data;
    return res.data as ResponseData<T>; // Return the data
  } catch (error: any) {
    // response.error = error.response?.data?.message as string;
    throw error; // Throw the error to be handled by Vue Query
  }
}

export async function handleSubmit<T>(
  method: 'post' | 'put',
  url: string,
  data: any
) {
  const response = reactive<RequestResponseType<ResponseData<T>>>({
    isLoading: true,
    error: '',
    data: {} as ResponseData<T>,
  });

  try {
    const res = await axiosInstance[method](url, data);
    if (!res.data) {
      throw new Error('Please try again later');
    }
    return res.data as ResponseData<T>;
  } catch (error: any) {
    throw error.response.data.message || error.message; // Throw the error to be handled by Vue Query
  }
}
