import {
   InfiniteData,
   useMutation,
   useQueryClient,
} from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { NotificationsPage } from '../types/notifications.interface';

export const useDeleteNotification = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ notificationId }: { notificationId: number }) =>
         notificationsApi.deleteNotification(notificationId),

      onMutate: async ({ notificationId }) => {
         await queryClient.cancelQueries({
            queryKey: ['notifications'],
         });

         const previousNotifications = queryClient.getQueryData<
            InfiniteData<NotificationsPage>
         >(['notifications']);

         queryClient.setQueryData<InfiniteData<NotificationsPage>>(
            ['notifications'],
            (old) => {
               if (!old) return old;

               return {
                  ...old,
                  pages: old.pages.map((page) => ({
                     ...page,
                     items: page.items.filter(
                        (notification) => notification.id !== notificationId
                     ),
                  })),
               };
            }
         );

         return { previousNotifications };
      },

      onError: (error, _, context) => {
         if (context?.previousNotifications) {
            queryClient.setQueryData(
               ['notifications'],
               context.previousNotifications
            );
         }

         const normalizedError = normalizeApiError(error);

         toast(normalizedError.message);
      },
   });
};
