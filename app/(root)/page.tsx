import SuggestedFriendsCard from '@/features/friends/components/cards/SuggestedFriendsCard';
import CreatePost from '@/features/post/components/forms/CreatePostComp';
import FeedWheel from '@/features/feed/components/FeedWheel';
import { Suspense } from 'react';

const HomeContent = () => {
   return (
      <section className="grid items-start bg-neutralWhite-200 gap-8 max-[1280px]:gap-4">
         {' '}
         <div>
            {' '}
            <CreatePost /> <FeedWheel />{' '}
         </div>{' '}
      </section>
   );
};
const Home = () => {
   return (
      <Suspense fallback={null}>
         {' '}
         <HomeContent />{' '}
      </Suspense>
   );
};

export default Home;
