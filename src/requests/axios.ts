import axios, { type AxiosInstance as Instance } from 'axios';

// Create an Axios instance with default configurations
const axiosInstance: Instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const store = localStorage.getItem('user');
if (store !== null && store !== undefined) {
  const { token } = JSON.parse(store).user;
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  delete axiosInstance.defaults.headers.common['Authorization'];
}

export default axiosInstance;
