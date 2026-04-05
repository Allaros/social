import { api } from '@/shared/api/axios';
import { IGetPosts, IGetProfilePosts } from '../types/feed.request';
import { GetFeedResponse } from '../types/feed.response';

export const feedApi = {
   getPosts: async (requestData: IGetPosts): Promise<GetFeedResponse> => {
      const { data } = await api.get('feed', {
         params: {
            limit: requestData.limit,
            cursor: requestData.cursor,
         },
      });

      return data;
   },

   getProfilePosts: async (
      requestData: IGetProfilePosts
   ): Promise<GetFeedResponse> => {
      const { data } = await api.get(
         `feed/profile/${requestData.targetProfileId}`,
         {
            params: {
               limit: requestData.limit,
               cursor: requestData.cursor,
            },
         }
      );
      return data;
   },

   getSavedPosts: async (requestData: IGetPosts): Promise<GetFeedResponse> => {
      const { data } = await api.get('feed/saved', {
         params: {
            limit: requestData.limit,
            cursor: requestData.cursor,
         },
      });

      return data;
   },
};
