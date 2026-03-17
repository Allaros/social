import { ApiError } from '@/shared/types/error';
import { AxiosError } from 'axios';
type ErrorResponse = {
   message?: string;
   code?: string;
};

export const normalizeApiError = (error: unknown): ApiError => {
   if (error instanceof AxiosError) {
      const data = error.response?.data;
      if (data && typeof data === 'object') {
         const err = data as ErrorResponse;
      }
      return new ApiError(
         data?.message ?? error.message ?? 'Unexpected error',
         data?.code ?? 'UNKNOWN_ERROR',
         error.response?.status ?? 500
      );
   }

   if (error instanceof ApiError) return error;

   if (error instanceof Error) {
      return new ApiError(error.message);
   }

   return new ApiError('Unexpected error');
};
