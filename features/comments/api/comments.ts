import { api } from '@/shared/api/axios';
import {
   ICreateComment,
   IEditComment,
   IGetComments,
} from '../types/comments.request';
import { CommentsPage } from '../types/comments.interface';
import { LikeTargetType } from '@/shared/constants/LikeTargetType';

export const commentsApi = {
   createComment: async (payload: ICreateComment) => {
      const { data } = await api.post('comments', { ...payload });
      return data;
   },

   getComments: async (payload: IGetComments): Promise<CommentsPage> => {
      const { data } = await api.get(
         `posts/${payload.postOrParentId}/comments`,
         {
            params: { cursor: payload.cursor, limit: payload.limit },
         }
      );
      return data;
   },

   getReplies: async (payload: IGetComments): Promise<CommentsPage> => {
      const { data } = await api.get(
         `comments/${payload.postOrParentId}/replies`,
         { params: { cursor: payload.cursor, limit: payload.limit } }
      );
      return data;
   },

   editComment: async (payload: IEditComment) => {
      const { data } = await api.put(`comments/${payload.commentId}`, {
         body: payload.body,
         postId: payload.postId,
      });
      return data;
   },

   deleteComment: async (commentId: number) => {
      const { data } = await api.delete(`comments/${commentId}`);
      return data;
   },

   likeComment: async (commentId: number) => {
      const { data } = await api.post(
         `likes/${LikeTargetType.COMMENT}/${commentId}`
      );
      return data;
   },
   unlikeComment: async (commentId: number) => {
      const { data } = await api.delete(
         `likes/${LikeTargetType.COMMENT}/${commentId}`
      );
      return data;
   },
};
