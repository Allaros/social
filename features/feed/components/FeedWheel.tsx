'use client';

import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import Post from '../../post/components/Post';
import { useGetFeed } from '../hooks/useGetFeed';
import { CommentsUIProvider } from '@/features/drawer/provider/drawerProvider';
import { FramedList } from '@/features/framer-animations/components/AnimatedList/FramedList';
import { FramedItem } from '@/features/framer-animations/components/AnimatedList/FramedItem';

const FeedWheel = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetFeed(10);

   const posts = data?.pages.flatMap((page) => page.posts) ?? [];

   if (!data) return <div className="card mt-10">Здесь пока ничего нет</div>;
   return (
      <div className="mt-10 max-md:mt-6 flex flex-col gap-8 max-md:gap-4">
         <FramedList preset="feed" layoutMode="full">
            {posts.map((post) => (
               <FramedItem>
                  <Post key={post.id} post={post} />
               </FramedItem>
            ))}
         </FramedList>

         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />
      </div>
   );
};

export default FeedWheel;
