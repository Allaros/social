import { useMutation } from '@tanstack/react-query';
import { notificationsApi } from '../api/notifications';

export const useMarkAsSeen = () => {
   return useMutation({
      mutationFn: ({ ids }: { ids: number[] }) =>
         notificationsApi.markAsSeen(ids),
   });
};
