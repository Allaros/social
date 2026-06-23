import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { chatsKeys } from '@/shared/lib/query-keys';

export const useDeleteDirectChat = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ chatIdentifier }: { chatIdentifier: string }) =>
         chatsApi.deleteDirect(chatIdentifier),

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: chatsKeys.list() });
      },
   });
};
