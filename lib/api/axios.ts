import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { triggerLogout } from '../handlers/sessionHandler';

let isRefreshing = false;
let failedQueue: {
   resolve: (value?: unknown) => void;
   reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
   failedQueue.forEach((promise) =>
      error ? promise.reject(error) : promise.resolve()
   );
   failedQueue = [];
};

export const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   withCredentials: true,
});

api.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const originalRequest = error.config as
         | (InternalAxiosRequestConfig & { _retry?: boolean })
         | undefined;

      const url = originalRequest?.url ?? '';

      if (error.response?.status !== 401 || !originalRequest) {
         return Promise.reject(error);
      }

      if (url.includes('/auth/refresh')) {
         triggerLogout();
         return Promise.reject(error);
      }

      if (originalRequest._retry) {
         triggerLogout();
         return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
         await api.post('/auth/refresh');
         return api(originalRequest);
      } catch (refreshError) {
         triggerLogout();
         return Promise.reject(refreshError);
      }
   }
);
