import { ApiError } from '@/shared/types/error';
import { normalizeApiError } from './normalizeApiErrors';
import { toast } from 'sonner';

export const handleGlobalError = (error: unknown) => {
   const normalized = normalizeApiError(error);

   if ((normalized as ApiError).handled) return;

   if (normalized.status && normalized.status < 500) {
      return;
   }

   toast.error(normalized.message);
};
