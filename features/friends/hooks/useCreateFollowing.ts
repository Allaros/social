import { useMutation, useQueryClient } from '@tanstack/react-query';
import { friendsApi } from '../api/friends';
import { toast } from 'sonner';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';

export const useCreateFollowing = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (followingId: number) =>
         friendsApi.followUser(followingId),

      onSuccess: () => {
         toast('Вы успешно подписались на пользователя');
      },

      onError: (error) => {
         const normalizedError = normalizeApiError(error);

         toast(normalizedError.message);
      },
   });
};
