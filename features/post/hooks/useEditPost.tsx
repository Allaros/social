import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';

export const useEditPost = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         postId,
         formData,
      }: {
         postId: number;
         formData: FormData;
      }) => postApi.editPost(postId, formData),

      onMutate: async ({ postId, formData }) => {
         await queryClient.cancelQueries({ queryKey: ['profile'] });

         const previousData = queryClient.getQueriesData({
            queryKey: ['profile'],
         });

         const content = formData.get('content') as string;
         const allowComments = formData.get('allowComments') === 'true';
         const visibility = formData.get('visibility') as string;

         queryClient.setQueriesData(
            { queryKey: ['profile'] },
            (oldData: any) => {
               if (!oldData) return oldData;

               return {
                  ...oldData,
                  pages: oldData.pages.map((page: any) => ({
                     ...page,
                     posts: page.posts.map((post: any) => {
                        if (post.id !== postId) return post;

                        return {
                           ...post,
                           content,
                           allowComments,
                           visibility,
                        };
                     }),
                  })),
               };
            }
         );

         return { previousData };
      },

      onError: (error, _, context) => {
         if (context?.previousData) {
            context.previousData.forEach(([queryKey, data]) => {
               queryClient.setQueryData(queryKey, data);
            });
         }

         const normalized = normalizeApiError(error);
         toast.error(normalized.message);
      },

      onSuccess: (data, variables) => {
         toast('Пост успешно изменен');

         queryClient.invalidateQueries({
            queryKey: ['profile'],
         });
      },
   });
};
