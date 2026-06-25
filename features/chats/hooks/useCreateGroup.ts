import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { CreateGroupChatPayload } from '../types/chats.request';
import { chatsKeys } from '@/shared/lib/query-keys';

export const useCreateGroup = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({
         invitedProfileIds,
         title,
         avatarStorageKey,
         description,
         isPublic,
      }: CreateGroupChatPayload) =>
         chatsApi.createGroupChat({
            invitedProfileIds,
            title,
            avatarStorageKey,
            description,
            isPublic,
         }),

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: chatsKeys.list() });
      },
   });
};
