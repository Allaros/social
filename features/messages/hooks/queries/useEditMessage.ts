import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { MessagesInfiniteData } from '../../types/messages.types';
import { updateMessages } from '../../helpers/optimistic/update-messages';
import { messagesKeys } from '@/shared/lib/query-keys';

export const useEditMessage = (chatIdentifier: string) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ messageId, text }: { messageId: number; text: string }) =>
         messagesApi.editMessage({ chatIdentifier, messageId, text }),

      onMutate: (variables) => {
         const previous = queryClient.getQueryData<MessagesInfiniteData>(
            messagesKeys.list(chatIdentifier)
         );
         queryClient.setQueryData(
            messagesKeys.list(chatIdentifier),
            (old: MessagesInfiniteData) =>
               old
                  ? updateMessages(old, (message) => {
                       if (message.id !== variables.messageId) {
                          return message;
                       }

                       return {
                          ...message,
                          content: {
                             ...message.content,
                             text: variables.text,
                          },
                          editedAt: new Date(),
                       };
                    })
                  : old
         );

         return { previous };
      },

      onError: (err, _variables, context) => {
         if (context?.previous) {
            queryClient.setQueryData(
               messagesKeys.list(chatIdentifier),
               context.previous
            );
         }

         const normalizedError = normalizeApiError(err);
         toast(normalizedError.message);
      },
   });
};
