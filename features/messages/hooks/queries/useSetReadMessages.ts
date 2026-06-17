import { useMutation } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';

export const useSetReadMessages = (chatIdentifier: string) => {
   return useMutation({
      mutationFn: ({
         lastMessageId,
         messageIds,
      }: {
         lastMessageId: number;
         messageIds: number[];
      }) =>
         messagesApi.setReadMessages({
            chatIdentifier,
            lastMessageId,
            messageIds,
         }),

      onError: (err) => {
         const normalizedError = normalizeApiError(err);

         toast(normalizedError.message);
      },
   });
};
