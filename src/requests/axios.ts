import useAuth from '@/stores/auth';
import { jwtDecode } from 'jwt-decode';
import axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
