import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

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

      const isAuthEndpoint =
         url.includes('/auth/login') ||
         url.includes('/auth/refresh') ||
         url.includes('/auth/register');

      if (
         error.response?.status === 401 &&
         originalRequest &&
         !originalRequest._retry &&
         !isAuthEndpoint
      ) {
         if (isRefreshing) {
            return new Promise((resolve, reject) => {
               failedQueue.push({
                  resolve: () => resolve(api(originalRequest)),
                  reject,
               });
            });
         }

         originalRequest._retry = true;
         isRefreshing = true;

         try {
            await api.post('/auth/refresh');
            processQueue(null);
            return api(originalRequest);
         } catch (refreshError) {
            processQueue(refreshError);
            return Promise.reject(refreshError);
         } finally {
            isRefreshing = false;
         }
      }

      return Promise.reject(error);
   }
);
