import { useMutation, useQueryClient } from '@tanstack/react-query';
import { friendsApi } from '../api/friends';
import { toast } from 'sonner';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';

export const useDeleteFollowing = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (followingId: number) =>
         friendsApi.unfollowUser(followingId),

      onSuccess: () => {
         toast('Вы отписались от пользователя');
      },

      onError: (error) => {
         const normalizedError = normalizeApiError(error);

         toast(normalizedError.message);
      },
   });
};
