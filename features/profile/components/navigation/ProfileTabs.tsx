'use client';

import { ProfileTabsList } from '@/features/profile/constants/ProfileTabsList';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const ProfileTabs = ({
   isOwner,
   isMobile,
}: {
   isOwner?: boolean;
   isMobile: boolean;
}) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const currentTab = searchParams.get('tab') ?? 'posts';

   if (!isOwner) return null;

   return (
      <div
         className={cn(
            'flex items-center gap-4  py-2',
            'md:justify-start md:px-11',
            'justify-between px-16'
         )}
      >
         {ProfileTabsList.map((tab, i) => (
            <div
               className={`textBody-medium ${tab.tab === currentTab ? 'text-neutralBlack-900' : 'text-neutralBlack-500'}`}
               key={i}
            >
               <button
                  className="cursor-pointer py-1 px-2 hover:bg-neutralWhite-400 rounded-sm"
                  onClick={() => router.push(`?tab=${tab.tab}`)}
               >
                  {isMobile ? (
                     <Image
                        src={tab.mobileIco}
                        alt={tab.label}
                        width={20}
                        height={20}
                     />
                  ) : (
                     tab.label
                  )}
               </button>
            </div>
         ))}
      </div>
   );
};

export default ProfileTabs;
