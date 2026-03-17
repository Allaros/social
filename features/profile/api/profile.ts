import { api } from '@/shared/api/axios';

export const profileApi = {
   getProfile: async (reqData: IGetProfile) => {
      const { data } = await api.get(`profile/${reqData.username}`);

      return data;
   },
};
