'use client';

import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import Post from '../../post/components/Post';
import { useGetFeed } from '../hooks/useGetFeed';

const FeedWheel = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetFeed(10);

   const posts = data?.pages.flatMap((page) => page.posts) ?? [];

   if (!data) return <div className="card mt-10">Здесь пока ничего нет</div>;
   return (
      <div className="mt-10 flex flex-col gap-8">
         {posts.map((post) => (
            <Post key={post.id} post={post} />
         ))}

         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />
      </div>
   );
};

export default FeedWheel;
