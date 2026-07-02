import SuggestedFriendsCard from '@/features/friends/components/cards/SuggestedFriendsCard';
import CreatePost from '@/features/post/components/forms/CreatePostComp';
import FeedWheel from '@/features/feed/components/FeedWheel';

const Home = () => {
   return (
      <section className="grid items-start bg-neutralWhite-200 gap-8 max-[1280px]:gap-4 ">
         <div>
            <CreatePost />
            <FeedWheel />
         </div>
      </section>
   );
};

export default Home;
