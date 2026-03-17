import { FriendsListData } from '@/features/friends/constants/FriendsTest';
import Image from 'next/image';
import AddImg from '@/public/icons/Add.svg';

const FriendsList = () => {
   return (
      <div className="p-8 flex flex-col gap-6">
         {FriendsListData.map((friend, index) => (
            <div key={index} className="flex items-center gap-4">
               <Image
                  src={friend.avatarUrl}
                  alt="Avatar"
                  width={56}
                  height={56}
                  className="rounded-full"
               />
               <div className="flex-1 ">
                  <p className="line-clamp-1 h6 text-neutralBlack-900">
                     {friend.name}
                  </p>
                  <p className="line-clamp-1 textLabel text-neutralBlack-800">
                     {friend.bio}
                  </p>
               </div>
               <button className="p-1.5 transition-colors cursor-pointer rounded-[6px] bg-neutralWhite-300 hover:bg-neutralWhite-500">
                  <Image
                     src={AddImg}
                     alt={'add friend'}
                     width={20}
                     height={20}
                  ></Image>
               </button>
            </div>
         ))}
      </div>
   );
};

export default FriendsList;
