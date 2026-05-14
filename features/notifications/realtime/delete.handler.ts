import { InfiniteData, QueryClient } from '@tanstack/react-query';

import {
   NotificationsPage,
   NotificationsStateType,
} from '../types/notifications.interface';

export const handleDeleted = (
   queryClient: QueryClient,
   payload: NotificationsStateType
) => {
   queryClient.setQueryData(['notification-state'], payload);

   const deletedIds = new Set(payload.notificationIds);

   queryClient.setQueryData<InfiniteData<NotificationsPage>>(
      ['notifications'],
      (old) => {
         if (!old) {
            return old;
         }

         return {
            ...old,
            pages: old.pages.map((page) => ({
               ...page,
               items: page.items.filter(
                  (notification) => !deletedIds.has(notification.id)
               ),
            })),
         };
      }
   );
};
