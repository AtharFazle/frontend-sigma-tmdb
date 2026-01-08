import axios from 'axios';
// import { useAuthStore } from '@/store/auth.store';
// import { useToast } from 'vue-toastification';
import { useToast } from '@/components/ui/toast/use-toast'

let isRefreshing = false;
let failedQueue:any = [];

const processQueue = (error:any, token:string | null) => {
  failedQueue.forEach((prom:any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/v1',
  timeout: 120000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { toast } = useToast()
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // const newToken = await authStore.refreshToken();
        // processQueue(null, newToken!);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else {
      let message = error.response?.status !== 500 ? error.response?.data?.message : 'Something went wrong';
       toast({
        variant: 'destructive',
        title: 'Error',
        description: message
      });

      console.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

