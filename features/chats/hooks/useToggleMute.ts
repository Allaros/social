import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { chatsKeys } from '@/shared/lib/query-keys';

export const useToggleMute = (chatIdentifier: string) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: () => chatsApi.toggleMute(chatIdentifier),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: chatsKeys.detail(chatIdentifier),
         });
      },
   });
};
