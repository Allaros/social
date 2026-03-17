import axios from 'axios';
import { toast } from 'sonner';

export const handleApiError = (
   error: unknown,
   defaultMessage = 'Произошла ошибка'
) => {
   if (axios.isAxiosError(error)) {
      if (error.response) {
         toast.error(error.response.data?.message || defaultMessage);
      } else {
         toast.error(error.message || 'Сетевая ошибка');
      }
   } else if (error instanceof Error) {
      toast.error(error.message || defaultMessage);
   } else {
      toast.error(defaultMessage);
   }
};
