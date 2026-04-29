import SuggestedFriendsCard from '@/features/friends/components/cards/SuggestedFriendsCard';
import CreatePost from '@/features/post/components/forms/CreatePostComp';
import FeedWheel from '@/features/feed/components/FeedWheel';

const Home = () => {
   return (
      <section className="grid items-start bg-neutralWhite-200 grid-cols-[6fr_3fr] max-lg:grid-cols-1 gap-8 max-[1280px]:gap-4 ">
         <div>
            <CreatePost />
            <FeedWheel />
         </div>
         <SuggestedFriendsCard />
      </section>
   );
};

export default Home;
