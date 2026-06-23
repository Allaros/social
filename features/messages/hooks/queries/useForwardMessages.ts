import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { ForwardPayload } from '../../types/messages.request';
import {
   ForwardMessagesResponse,
   MessageResponseType,
   MessagesInfiniteData,
   MessageStatusEnum,
} from '../../types/messages.types';
import { createOptimisticForwardMessages } from '../../helpers/optimistic/create-optimistic-messages';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { prependMessages } from '../../helpers/optimistic/prepend-messages';
import { messagesKeys } from '@/shared/lib/query-keys';
import { updateMessagesByClientId } from '../../helpers/optimistic/update-messages-by-client-id';

export const useForwardMessages = (chatIdentifier: string) => {
   const profile = useProfile();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         forwardPayload,
         messages,
      }: {
         forwardPayload: ForwardPayload[];
         messages: MessageResponseType[];
      }) => messagesApi.forwardMessages({ chatIdentifier, forwardPayload }),

      onMutate: (variables) => {
         if (!profile) return;
         const previous = queryClient.getQueryData<MessagesInfiniteData>(
            messagesKeys.list(chatIdentifier)
         );

         const payloadMap = new Map(
            variables.forwardPayload.map((item) => [item.id, item.clientId])
         );

         const sortedMessages = [...variables.messages].sort(
            (a, b) =>
               new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
         );

         const optimisticMessages = createOptimisticForwardMessages({
            messages: sortedMessages.map((message) => ({
               ...message,
               clientId: payloadMap.get(message.id),
            })),
            profile: profile,
         });

         queryClient.setQueryData(
            messagesKeys.list(chatIdentifier),
            (old: MessagesInfiniteData) =>
               old
                  ? prependMessages(old, [...optimisticMessages].reverse())
                  : old
         );

         return { previous };
      },

      onSuccess: (response: ForwardMessagesResponse[]) => {
         const updates = new Map(
            response.map((item) => [
               item.clientId,
               (message: MessageResponseType) => ({
                  ...message,
                  id: item.id,
                  createdAt: item.createdAt,
                  status: MessageStatusEnum.SENT,
               }),
            ])
         );

         queryClient.setQueryData(
            messagesKeys.list(chatIdentifier),
            (old: MessagesInfiniteData) =>
               old ? updateMessagesByClientId(old, updates) : old
         );
      },

      onError: (_err, _variables, context) => {
         if (context?.previous) {
            queryClient.setQueryData(
               messagesKeys.list(chatIdentifier),
               context.previous
            );
         }

         const normalizedError = normalizeApiError(_err);

         toast(normalizedError.message);
      },
   });
};
