import ProfileInfo from '@/features/profile/components/ProfileInfo';
import ProfileNums from '@/features/profile/components/ProfileNums';
import ProfileTabs from '@/features/profile/components/ProfileTabs';

const ProfileCard = () => {
   return (
      <div className="card mb-8">
         <div className="flex items-center justify-between gap-4 border-b border-neutralWhite-400 py-8 px-11">
            <ProfileInfo />
            <ProfileNums />
         </div>
         <ProfileTabs />
      </div>
   );
};

export default ProfileCard;
