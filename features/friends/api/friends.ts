import { api } from '@/shared/api/axios';
import { RelationType } from '../types/friends.interface';

export interface GetRelationsParams {
   type: RelationType;
   query?: string;
   cursor?: string;
   limit?: number;
}

export const friendsApi = {
   followUser: async (followingId: number) => {
      const { data } = await api.post(`follows`, { followingId });
      return data;
   },

   unfollowUser: async (followingId: number) => {
      const { data } = await api.delete(`follows/${followingId}`);
      return data;
   },

   getRelations: async ({ type, query, cursor, limit }: GetRelationsParams) => {
      const { data } = await api.get(`profile/relations/${type}`, {
         params: {
            query,
            cursor,
            limit,
         },
      });

      return data;
   },
};
