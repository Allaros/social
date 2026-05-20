import { chatsApi } from '@/features/chats/api/chats';

import { useLoader } from '@/features/loader/hooks/useLoader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChatListItem, ChatsInfiniteData } from '../types/chats.types';
import {
   CreateDirectChatPayload,
   CreateGroupChatPayload,
} from '../types/chats.request';
import { chatsKeys } from '@/shared/lib/query-keys';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { prependChatToCache } from '../helpers/optimistic-create';

export const useCreateChat = () => {
   const queryClient = useQueryClient();
   const { showLoader, hideLoader } = useLoader();

   const invalidateChats = () => {
      queryClient.invalidateQueries({ queryKey: chatsKeys.lists() });
   };

   const createDirect = useMutation({
      mutationFn: (payload: CreateDirectChatPayload) =>
         chatsApi.createDirectChat(payload),

      // onSuccess: (response) => {
      //    prependChatToCache(response, queryClient);
      // },

      onError: (error) => {
         const normalizedError = normalizeApiError(error);
         toast.error(`Не удалось создать чат ${normalizedError.message}`);
      },
   });

   const createGroup = useMutation({
      mutationFn: (payload: CreateGroupChatPayload) =>
         chatsApi.createGroupChat(payload),

      onMutate: showLoader,

      onSettled: hideLoader,

      // onSuccess: (response) => {
      //    prependChatToCache(response.chat, queryClient);

      //    invalidateChats();

      //    toast.success('Группа создана');
      // },

      onError: () => toast.error('Не удалось создать группу'),
   });

   return { createDirect, createGroup };
};
