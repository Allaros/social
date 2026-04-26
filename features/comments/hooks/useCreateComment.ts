import {
   InfiniteData,
   useMutation,
   useQueryClient,
} from '@tanstack/react-query';
import { commentsApi } from '../api/comments';
import { ICreateComment } from '../types/comments.request';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { CommentResponse, CommentsPage } from '../types/comments.interface';
import {
   optimisticCreateComment,
   rollbackCreateComment,
} from '../helpers/CommentCreateHelper';
import { updateCommentInPages } from '../helpers/UpdateCommentInPage';

type PendingComment = Partial<CommentResponse> & {
   id: number;
   content: string;
   isPending: true;
};

type Author = {
   id?: number;
   name?: string;
   username?: string;
   avatarUrl?: string;
};

const useCreateComment = (author?: Author) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (payload: ICreateComment) =>
         commentsApi.createComment(payload),

      onMutate: async (variables) => {
         const { body } = variables;

         const tempId = Date.now();

         const tempComment: PendingComment = {
            id: tempId,
            content: body,
            createdAt: new Date().toISOString(),
            isDeleted: false,
            isPending: true,
            likesCount: 0,
            repliesCount: 0,
            isLiked: false,
            parentId: variables.parentId ?? null,
            replyOnId: variables.replyOnId ?? null,
            author: {
               id: author?.id ?? 0,
               username: author?.username ?? '@вы',
               name: author?.name ?? 'Вы',
               avatarUrl: author?.avatarUrl,
            },
         };

         const context = await optimisticCreateComment({
            queryClient,
            variables,
            tempComment: tempComment as CommentResponse,
         });

         return {
            ...context,
            tempId,
         };
      },

      onSuccess: (data, _vars, context) => {
         if (!context) return;

         const { tempId } = context;

         queryClient.setQueriesData(
            { queryKey: ['comments'] },
            (old: InfiniteData<CommentsPage> | undefined) =>
               updateCommentInPages(old, tempId, (c) => ({
                  ...c,
                  ...data,
                  id: data.id,
                  isPending: false,
               }))
         );

         queryClient.setQueriesData(
            { queryKey: ['replies'] },
            (old: InfiniteData<CommentsPage> | undefined) =>
               updateCommentInPages(old, tempId, (c) => ({
                  ...c,
                  ...data,
                  id: data.id,
                  isPending: false,
               }))
         );
      },
      onError: (err, _vars, context) => {
         rollbackCreateComment(queryClient, context);
         toast(normalizeApiError(err).message);
      },
   });
};

export default useCreateComment;
