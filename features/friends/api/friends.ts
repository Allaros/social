import { api } from '@/shared/api/axios';

export const friendsApi = {
   followUser: async (followingId: number) => {
      const { data } = await api.post(`follows`, { followingId });
      return data;
   },

   unfollowUser: async (followingId: number) => {
      const { data } = await api.delete(`follows/${followingId}`);
      return data;
   },
};
