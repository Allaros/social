'use client';

import ProfileInfo from '@/features/profile/components/ProfileInfo';
import ProfileNums from '@/features/profile/components/ProfileNums';
import ProfileTabs from '@/features/profile/components/navigation/ProfileTabs';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { cn } from '@/shared/lib/utils';

const ProfileCard = ({
   profile,
   isError,
}: {
   profile?: ProfileResponce;
   isError: boolean;
}) => {
   const isMobile = useIsMobile();
   return (
      <div className="card md:mb-8 mb-2">
         <div
            className={cn(
               'flex border-b border-neutralWhite-400',
               'px-8 py-6 gap-2 flex-col items-center',
               'md:justify-between md:px-11 md:py-8 md:gap-4 md:items-start',
               'lg:flex-row lg:items-center'
            )}
         >
            <ProfileInfo
               profile={profile}
               isError={isError}
               isMobile={isMobile}
            />
            <ProfileNums profile={profile} isError={isError} />
         </div>
         <ProfileTabs isOwner={profile?.isOwner} isMobile={isMobile} />
      </div>
   );
};

export default ProfileCard;
