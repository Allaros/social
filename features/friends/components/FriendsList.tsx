import { FriendsListData } from '@/features/friends/constants/FriendsTest';
import AddIco from '@/public/icons/Add.svg';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import Image from 'next/image';

const FriendsList = () => {
   return (
      <div className="p-8 flex flex-col gap-6">
         {FriendsListData.map((friend, index) => (
            <div key={index} className="flex items-center gap-4">
               <div className="relative size-12">
                  <AvatarComponent
                     avatarUrl={friend.avatarUrl}
                     name={friend.name}
                     className="absolute inset-0"
                  />
               </div>
               <div className="flex-1 ">
                  <p className="line-clamp-1 h6 text-neutralBlack-900">
                     {friend.name}
                  </p>
                  <p className="line-clamp-1 textLabel text-neutralBlack-800">
                     {friend.bio}
                  </p>
               </div>
               <button className="p-1 transition-colors cursor-pointer rounded-[6px] bg-neutralWhite-300 hover:bg-neutralWhite-500">
                  <Image src={AddIco} alt="add" width={20} height={20} />
               </button>
            </div>
         ))}
      </div>
   );
};

export default FriendsList;
