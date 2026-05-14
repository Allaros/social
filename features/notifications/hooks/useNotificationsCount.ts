import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications';
import { NotificationsStateType } from '../types/notifications.interface';

export const useNotificationsState = () => {
   return useQuery<NotificationsStateType>({
      queryKey: ['notification-state'],
      queryFn: notificationsApi.getNotificationsState,
      staleTime: Infinity,
   });
};
