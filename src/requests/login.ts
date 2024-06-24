import useAuth from '@/stores/auth';
import type { User } from '@/utils/typings';
import axios, { AxiosError } from 'axios';
import { reactive } from 'vue';

interface LoginRes {
  isLoading: boolean;
  error: string;
  data: User | null;
}

const useAxiosLogin = async (
  username: string,
  password: string
): Promise<LoginRes> => {
  const auth = useAuth();
  const response = reactive<LoginRes>({
    isLoading: true,
    error: '',
    data: null,
  });
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.post(`${baseURL}users/login`, {
      password,
      username,
    });
    if (!res.data) {
      throw new Error('Unable to login');
    }

    auth.setUser(res.data);
    response.data = res.data;
  } catch (error: any) {
    response.error = error.response?.data?.message as string;
  } finally {
    response.isLoading = false;
  }

  return response;
};

export default useAxiosLogin;
