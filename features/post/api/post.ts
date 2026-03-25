import { api } from '@/shared/api/axios';
import { PostResponce } from '../types/post.responce';

export const postApi = {
   createPost: async (formData: FormData) => {
      const { data } = await api.post('posts/create', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      return data;
   },

   getAll: async (): Promise<PostResponce[]> => {
      const { data } = await api.get('posts');

      return data;
   },

   getMyPosts: async (): Promise<PostResponce[]> => {
      const { data } = await api.get('posts/my');
      return data;
   },

   hardDeletePost: async (postId: number) => {
      const { data } = await api.delete(`posts/hard-delete/${postId}`);
      return data;
   },

   savePost: async (postId: number) => {
      const { data } = await api.post(`posts/save/${postId}`);
      return data;
   },
   unsavePost: async (postId: number) => {
      const { data } = await api.delete(`posts/save/${postId}`);
      return data;
   },

   getSavedPosts: async () => {
      const { data } = await api.get(`posts/save`);
      return data;
   },
};
