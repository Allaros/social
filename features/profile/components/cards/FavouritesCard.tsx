import { useGetSavedFeed } from '@/features/feed/hooks/useGetSavedFeed';
import Post from '@/features/post/components/Post';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';

const FavouritesCard = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetSavedFeed(5);

   if (!data) return <div className="card mt-10">Здесь пока ничего нет</div>;

   const posts = data?.pages.flatMap((page) => page.posts) ?? [];
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

export default FavouritesCard;
