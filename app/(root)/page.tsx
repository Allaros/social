import SuggestedFriendsCard from '@/features/friends/components/cards/SuggestedFriendsCard';
import UserCard from '@/features/user/components/cards/UserCard';
import CreatePost from '@/features/feed/components/forms/CreatePost';

const Home = () => {
   return (
      <section className="grid items-start bg-neutralWhite-200 grid-cols-[6fr_3fr] max-md:grid-cols-2 gap-8 ">
         <div>
            <CreatePost />
         </div>
         <SuggestedFriendsCard />
      </section>
   );
};

export default Home;
