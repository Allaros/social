import { useGetSavedFeed } from '@/features/feed/hooks/useGetSavedFeed';
import Post from '@/features/post/components/Post';
import EmptyPage from '@/shared/components/EmptyPage';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';

const FavouritesCard = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetSavedFeed(5);

   const posts = data?.pages.flatMap((page) => page.posts) ?? [];

   if (!data || !posts || !posts.length)
      return (
         <div className="card">
            <EmptyPage preset="favourites" />
         </div>
      );
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
