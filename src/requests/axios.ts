import axios, { type AxiosInstance as Instance } from 'axios';

// Create an Axios instance with default configurations
const axiosInstance: Instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const store = localStorage.getItem('user');
if (store !== null && store !== undefined) {
  const user = JSON.parse(store);
  if (user.user.token) {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.user.token}`;
  }
} else {
  delete axiosInstance.defaults.headers.common['Authorization'];
}

export default axiosInstance;
