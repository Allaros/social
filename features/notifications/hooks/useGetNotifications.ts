import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications';
import { NotificationsPage } from '../types/notifications.interface';

export const useGetNotifications = () => {
   return useInfiniteQuery<
      NotificationsPage,
      Error,
      InfiniteData<NotificationsPage>,
      [string],
      string | undefined
   >({
      queryKey: ['notifications'],
      queryFn: ({ pageParam }) => notificationsApi.getNotifications(pageParam),
      getNextPageParam: (lastPage) => {
         return lastPage.nextCursor ?? undefined;
      },
      initialPageParam: undefined,
   });
};
