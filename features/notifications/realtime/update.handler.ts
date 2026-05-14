import { InfiniteData, QueryClient } from '@tanstack/react-query';
import {
   NotificationResponse,
   NotificationsPage,
   NotificationsStateType,
} from '../types/notifications.interface';
import { notificationsApi } from '../api/notifications';

export const handleUpdated = async (
   queryClient: QueryClient,
   payload: NotificationsStateType
) => {
   queryClient.setQueryData(['notification-state'], payload);

   const notificationId = payload.notificationIds[0];

   if (!notificationId) {
      return;
   }

   const cached = queryClient.getQueryData<InfiniteData<NotificationsPage>>([
      'notifications',
   ]);

   if (!cached) {
      return;
   }

   const exists = cached.pages.some((page) =>
      page.items.some((notification) => notification.id === notificationId)
   );

   if (!exists) {
      return;
   }

   const freshFirstPage = await notificationsApi.getNotifications();

   const updatedNotification = freshFirstPage.items.find(
      (notification: NotificationResponse) => notification.id === notificationId
   );

   if (!updatedNotification) {
      return;
   }

   queryClient.setQueryData<InfiniteData<NotificationsPage>>(
      ['notifications'],
      (old) => {
         if (!old) return old;

         const pagesWithoutOld = old.pages.map((page) => ({
            ...page,
            items: page.items.filter(
               (notification) => notification.id !== notificationId
            ),
         }));

         const firstPage = pagesWithoutOld[0];

         return {
            ...old,
            pages: [
               {
                  ...firstPage,
                  items: [updatedNotification, ...firstPage.items],
               },
               ...pagesWithoutOld.slice(1),
            ],
         };
      }
   );
};
