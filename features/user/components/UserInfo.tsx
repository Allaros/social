'use client';
import { useProfile } from '@/features/profile/hooks/useProfile';
import Image from 'next/image';
import UnknownAvatar from '@/public/icons/Incognito.svg';

const UserInfo = () => {
   const profile = useProfile();
   return (
      <div>
         <div className="flex flex-col gap-4 mt-11 px-8 max-lg:px-4">
            <div className="rounded-full border border-neutralWhite-100 relative w-14 h-14 overflow-hidden">
               <Image
                  src={profile?.avatarUrl ? profile.avatarUrl : UnknownAvatar}
                  fill
                  alt="avatar"
                  className="cover"
               />
            </div>
            <div className="flex flex-col gap-0.5 items-start">
               <p className="textBody-medium text-neutralBlack-900 font-(--font-inter)">
                  {profile?.name}
               </p>
               <p className="textLabel text-neutralBlack-800">{profile?.bio}</p>
            </div>
         </div>
      </div>
   );
};

export default UserInfo;
