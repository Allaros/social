'use client';

import ProfileInfo from '@/features/profile/components/ProfileInfo';
import ProfileNums from '@/features/profile/components/ProfileNums';
import ProfileTabs from '@/features/profile/components/navigation/ProfileTabs';

const ProfileCard = ({
   profile,
   isError,
}: {
   profile?: ProfileResponce;
   isError: boolean;
}) => {
   return (
      <div className="card mb-8">
         <div className="flex items-center justify-between gap-4 border-b border-neutralWhite-400 py-8 px-11">
            <ProfileInfo profile={profile} isError={isError} />
            <ProfileNums profile={profile} isError={isError} />
         </div>
         <ProfileTabs isOwner={profile?.isOwner} />
      </div>
   );
};

export default ProfileCard;
