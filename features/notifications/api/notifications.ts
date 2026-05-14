import { api } from '@/shared/api/axios';

export const notificationsApi = {
   getNotifications: async (cursor?: string) => {
      const { data } = await api.get(`notifications`, { params: { cursor } });

      return data;
   },

   deleteNotification: async (id: number) => {
      const { data } = await api.delete(`notifications/${id}`);
      return { data };
   },

   markAsSeen: async (ids: number[]) => {
      const { data } = await api.put('notifications', { notificationIds: ids });
      return data;
   },

   getNotificationsState: async () => {
      const { data } = await api.get(`notifications/state`);
      return data;
   },
};
