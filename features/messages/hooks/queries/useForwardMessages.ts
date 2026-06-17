import { useMutation } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { ForwardPayload } from '../../types/messages.request';

export const useForwardMessages = (chatIdentifier: string) => {
   return useMutation({
      mutationFn: ({ forwardPayload }: { forwardPayload: ForwardPayload[] }) =>
         messagesApi.forwardMessages({ chatIdentifier, forwardPayload }),

      onError: (err) => {
         const normalizedError = normalizeApiError(err);

         toast(normalizedError.message);
      },
   });
};
