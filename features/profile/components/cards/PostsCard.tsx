import { useGetProfileFeed } from '@/features/feed/hooks/useGetProfileFeed';
import { FramedItem } from '@/features/framer-animations/components/AnimatedList/FramedItem';
import { FramedList } from '@/features/framer-animations/components/AnimatedList/FramedList';
import Post from '@/features/post/components/Post';
import EmptyPage from '@/shared/components/EmptyPage';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';

const PostsCard = ({
   id,
   username,
   isOwner,
}: {
   id?: number;
   username: string;
   isOwner: boolean;
}) => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetProfileFeed(
      username,
      id ?? 0,
      5,
      {
         enabled: !!id,
      }
   );

   if (!id) return null;

   const posts = data?.pages.flatMap((page) => page.posts) ?? [];

   if (!posts || !posts.length)
      return (
         <div className="card">
            <EmptyPage preset={isOwner ? 'ownProfilePosts' : 'profilePosts'} />
         </div>
      );

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

export default PostsCard;
