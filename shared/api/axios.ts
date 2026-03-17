import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import ROUTES from '@/shared/constants/routes';

let isRefreshing = false;

let failedQueue: {
   resolve: () => void;
   reject: (error: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
   failedQueue.forEach((promise) => {
      if (error) {
         promise.reject(error);
      } else {
         promise.resolve();
      }
   });

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

      if (!originalRequest) {
         return Promise.reject(error);
      }

      const status = error.response?.status;
      const url = originalRequest.url ?? '';

      if (status !== 401) {
         return Promise.reject(error);
      }

      if (url.includes('/auth/refresh')) {
         window.location.href = ROUTES.auth.signIn;
         return Promise.reject(error);
      }

      const code = (error.response?.data as any)?.code;

      const refreshableErrors = [
         'TOKEN_EXPIRED',
         'ACCESS_TOKEN_MISSING',
         'INVALID_TOKEN',
      ];

      if (!refreshableErrors.includes(code)) {
         return Promise.reject(error);
      }

      if (originalRequest._retry) {
         window.location.href = ROUTES.auth.signIn;
         return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
         return new Promise((resolve, reject) => {
            failedQueue.push({
               resolve: () => resolve(api(originalRequest)),
               reject,
            });
         });
      }

      isRefreshing = true;

      try {
         await api.post('/auth/refresh');

         processQueue(undefined);

         return api(originalRequest);
      } catch (refreshError) {
         processQueue(refreshError);

         window.location.href = ROUTES.auth.signIn;

         return Promise.reject(refreshError);
      } finally {
         isRefreshing = false;
      }
   }
);
