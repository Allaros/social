import Post from '@/features/post/components/Post';
import { useGetMyPosts } from '@/features/post/hooks/useGetMyPosts';

const PostsCard = () => {
   const { data } = useGetMyPosts();
   console.log(data);

   if (!data) return <div className="card mt-10">Здесь пока ничего нет</div>;
   return (
      <div className="mt-10 flex flex-col gap-8">
         {data.map((post) => (
            <Post key={post.id} post={post} />
         ))}
      </div>
   );
};

export default PostsCard;
