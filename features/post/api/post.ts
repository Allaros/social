import { api } from '@/shared/api/axios';
import { LikeTargetType } from '@/shared/constants/LikeTargetType';

export const postApi = {
   //================================== Post Module ==============================================

   createPost: async (formData: FormData) => {
      const { data } = await api.post('posts', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      return data;
   },

   hardDeletePost: async (postId: number) => {
      const { data } = await api.delete(`posts/${postId}/hard`);
      return data;
   },

   softDelete: async (postId: number) => {
      const { data } = await api.delete(`posts/${postId}`);
      return data;
   },

   recoverPost: async (postId: number) => {
      const { data } = await api.put(`posts/${postId}`);
      return data;
   },

   editPost: async (postId: number, formData: FormData) => {
      const { data } = await api.put(`posts/edit/${postId}`, formData);
      return data;
   },

   addView: async (postId: number) => {
      const { data } = await api.post(`posts/${postId}/view`);
      return data;
   },

   //================================== Saving Module ==============================================

   savePost: async (postId: number) => {
      const { data } = await api.post(`save/${postId}`);
      return data;
   },
   unsavePost: async (postId: number) => {
      const { data } = await api.delete(`save/${postId}`);
      return data;
   },

   //================================== Like Module ==============================================

   likePost: async (postId: number) => {
      const { data } = await api.post(`likes/${LikeTargetType.POST}/${postId}`);
      return data;
   },

   unlikePost: async (postId: number) => {
      const { data } = await api.delete(
         `likes/${LikeTargetType.POST}/${postId}`
      );
      return data;
   },
};
