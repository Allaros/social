'use client';
import Image from 'next/image';
import Cover from '@/public/Cover.png';
import UserInfo from '@/features/user/components/UserInfo';
import UserLinks from '@/features/user/components/navigation/UserLinks';
import { UserLinksData } from '@/features/user/constants/UserLinksData';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

const UserCard = () => {
   const isMobile = useIsMobile();
   if (isMobile) return null;
   return (
      <div className="card relative ">
         <div className="absolute top-0 left-0 w-full h-18">
            <Image
               src={Cover}
               alt="cover"
               fill
               className="object-cover rounded-t-[6px]"
            />
         </div>
         <div className="flex flex-col gap-4">
            <UserInfo />

            <UserLinks linksData={UserLinksData} />
         </div>
      </div>
   );
};

export default UserCard;
