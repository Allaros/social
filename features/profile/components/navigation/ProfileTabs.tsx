'use client';

import { ProfileTabsList } from '@/features/profile/constants/ProfileTabsList';
import { useRouter, useSearchParams } from 'next/navigation';

const ProfileTabs = ({ isOwner }: { isOwner?: boolean }) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const currentTab = searchParams.get('tab') ?? 'posts';

   if (!isOwner) return null;

   return (
      <div className="flex items-center gap-4 px-11 py-2">
         {ProfileTabsList.map((tab, i) => (
            <div
               className={`textBody-medium ${tab.tab === currentTab ? 'text-neutralBlack-900' : 'text-neutralBlack-500'}`}
               key={i}
            >
               <button
                  className="cursor-pointer py-1 px-2 hover:bg-neutralWhite-400 rounded-sm"
                  onClick={() => router.push(`?tab=${tab.tab}`)}
               >
                  {tab.label}
               </button>
            </div>
         ))}
      </div>
   );
};

export default ProfileTabs;
