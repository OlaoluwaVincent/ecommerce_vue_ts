import type { User } from '@/utils/typings';
import axios, { AxiosError } from 'axios';
import { reactive } from 'vue';

interface LoginRes {
  isLoading: boolean;
  error: string;
  data: {
    message: string;
    user: User | null;
  } | null;
}

interface Params {
  fullname: string;
  email: string;
  username: string;
  password: string;
}

const useAxiosRegister = async (data: Params): Promise<LoginRes> => {
  const response = reactive<LoginRes>({
    isLoading: true,
    error: '',
    data: null,
  });
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.post(`${baseURL}users/register`, { ...data });

    response.data = res.data;
  } catch (error: any) {
    response.error = error.response?.data?.message as string;
  } finally {
    response.isLoading = false;
  }

  return response;
};

export default useAxiosRegister;
