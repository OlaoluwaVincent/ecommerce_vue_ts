import useAuth from '@/stores/auth';
import axios, { AxiosError } from 'axios';
import { ref } from 'vue';

const useAxiosLogin = async (username: string, password: string) => {
  const auth = useAuth();
  const response = ref(null);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.post(`${baseURL}/users/login`, {
      password,
      username,
    });
    if (!res.data) {
      throw new Error('Unable to  login');
    }

    auth.setUser(res.data);
    return (response.value = res.data);
  } catch (error: any) {
    const error_axios = error as AxiosError;
    // console.log(error_axios.response?.data);
    return error_axios.response?.data;
  }
};

export default useAxiosLogin;
