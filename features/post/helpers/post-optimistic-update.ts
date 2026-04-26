import { QueryClient, QueryKey } from '@tanstack/react-query';

export const updatePostInData = <T>(
   data: T,
   postId: number,
   updater: (post: any) => any
): T => {
   if (!data) return data;

   if ((data as any).pages) {
      return {
         ...(data as any),
         pages: (data as any).pages.map((page: any) => {
            if (!page?.posts) return page;

            return {
               ...page,
               posts: page.posts.map((post: any) =>
                  post?.id === postId ? updater(post) : post
               ),
            };
         }),
      };
   }

   if ((data as any).posts) {
      return {
         ...(data as any),
         posts: (data as any).posts.map((post: any) =>
            post?.id === postId ? updater(post) : post
         ),
      };
   }

   if ((data as any)?.id === postId) {
      return updater(data);
   }

   return data;
};

export const optimisticUpdatePosts = async ({
   queryClient,
   postId,
   updater,
}: {
   queryClient: QueryClient;
   postId: number;
   updater: (post: any) => any;
}) => {
   await queryClient.cancelQueries({
      predicate: (query) => query.queryKey[0] === 'posts',
   });

   // 📦 сохраняем все предыдущие данные
   const previousData = queryClient.getQueriesData({
      predicate: (query) => query.queryKey[0] === 'posts',
   });

   queryClient.setQueriesData(
      {
         predicate: (query) => query.queryKey[0] === 'posts',
      },
      (old) => updatePostInData(old, postId, updater)
   );

   return { previousData };
};

export const rollbackPosts = (
   queryClient: QueryClient,
   previousData?: [readonly unknown[], unknown][]
) => {
   previousData?.forEach(([key, data]) => {
      queryClient.setQueryData(key, data);
   });
};
