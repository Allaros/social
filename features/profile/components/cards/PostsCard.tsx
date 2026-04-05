import { useGetProfileFeed } from '@/features/feed/hooks/useGetProfileFeed';
import Post from '@/features/post/components/Post';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';

const PostsCard = ({ id, username }: { id?: number; username: string }) => {
   if (!id) return null;

   const { data, fetchNextPage, hasNextPage, isFetching } = useGetProfileFeed(
      username,
      id,
      5
   );

   if (!data) return <div className="card mt-10">Здесь пока ничего нет</div>;

   const posts = data?.pages.flatMap((page) => page.posts) ?? [];

   return (
      <div className="mt-10 flex flex-col gap-8">
         {posts.map((post) => (
            <Post key={post.id} post={post} editable={post.isOwned} />
         ))}

         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />
      </div>
   );
};

export default PostsCard;
