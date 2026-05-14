import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { notificationsApi } from '../api/notifications';

import {
   NotificationResponse,
   NotificationsPage,
   NotificationsStateType,
} from '../types/notifications.interface';

export const handleCreated = async (
   queryClient: QueryClient,
   payload: NotificationsStateType
) => {
   queryClient.setQueryData(['notification-state'], payload);
   const cached = queryClient.getQueryData<InfiniteData<NotificationsPage>>([
      'notifications',
   ]);

   if (!cached) {
      return;
   }

   const notificationId = payload.notificationIds[0];

   if (!notificationId) {
      return;
   }

   const alreadyExists = cached.pages.some((page) =>
      page.items.some((notification) => notification.id === notificationId)
   );

   if (alreadyExists) {
      return;
   }

   const freshFirstPage = await notificationsApi.getNotifications();

   const newNotification = freshFirstPage.items.find(
      (notification: NotificationResponse) => notification.id === notificationId
   );

   if (!newNotification) {
      return;
   }

   queryClient.setQueryData<InfiniteData<NotificationsPage>>(
      ['notifications'],
      (old) => {
         if (!old) return old;

         const firstPage = old.pages[0];

         const merged = [newNotification, ...firstPage.items];

         const unique = Array.from(
            new Map(merged.map((item) => [item.id, item])).values()
         );

         return {
            ...old,
            pages: [
               {
                  ...firstPage,
                  items: unique,
               },
               ...old.pages.slice(1),
            ],
         };
      }
   );
};
