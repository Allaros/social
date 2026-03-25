import { api } from '@/shared/api/axios';

export const profileApi = {
   getProfile: async (reqData: IGetProfile) => {
      const { data } = await api.get(`profile/${reqData.username}`);

      return data;
   },

   updateProfile: async (formData: FormData) => {
      const { data } = await api.put('profile/update', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      return data;
   },
};
