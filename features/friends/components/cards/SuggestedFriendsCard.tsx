import FriendsList from '@/features/friends/components/FriendsList';

const SuggestedFriendsCard = () => {
   return (
      <div className="card max-lg:hidden">
         <h2 className="h5 border-b border-neutralWhite-400 px-10 py-6 text-neutralBlack-900">
            Возможно вы друзья
         </h2>
         <FriendsList />
      </div>
   );
};

export default SuggestedFriendsCard;
