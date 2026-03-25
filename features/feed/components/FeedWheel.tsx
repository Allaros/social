'use client';

import { useGetAllPosts } from '@/features/post/hooks/useGetAllPosts';
import Post from '../../post/components/Post';
import { useMe } from '@/features/auth/hooks/useMe';

const FeedWheel = () => {
   const { data } = useGetAllPosts();

   const { data: user } = useMe();

   if (!data) return <div className="card mt-10">Здесь пока ничего нет</div>;
   return (
      <div className="mt-10 flex flex-col gap-8">
         {data.map((post) => (
            <Post key={post.id} post={post} userProfileId={user?.profile?.id} />
         ))}
      </div>
   );
};

export default FeedWheel;
