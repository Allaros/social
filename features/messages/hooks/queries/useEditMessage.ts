import { useMutation } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';

export const useEditMessage = (chatIdentifier: string) => {
   return useMutation({
      mutationFn: ({ messageId, text }: { messageId: number; text: string }) =>
         messagesApi.editMessage({ chatIdentifier, messageId, text }),

      onError: (err) => {
         const normalizedError = normalizeApiError(err);

         toast(normalizedError.message);
      },
   });
};
