import { ApiError } from '@/types/error';
import { AxiosError } from 'axios';

export const normalizeApiError = (error: unknown): ApiError => {
   if (error instanceof AxiosError) {
      const data = error.response?.data as
         | {
              message?: string;
              code?: string;
           }
         | undefined;

      return new ApiError(
         data?.message ?? 'Unexpected error',
         data?.code ?? 'UNKNOWN_ERROR',
         error.response?.status
      );
   }

   if (error instanceof ApiError) return error;

   return new ApiError('Unexpected error');
};
