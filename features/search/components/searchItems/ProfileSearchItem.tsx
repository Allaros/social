import Image from 'next/image';
import UnknownImg from '@/public/icons/Incognito.svg';
import ActionButtons from './ActionButtons';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import ROUTES from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';
import { useToggleFollow } from '@/features/friends/hooks/useToggleFollow';
import { ProfileListItem } from '@/features/profile/types/profile.interface';
import AvatarComponent from '@/features/user/components/AvatarComponent';

const ProfileSearchItem = ({ profile }: { profile: ProfileListItem }) => {
   const { mutate: toggleFollow, isPending } = useToggleFollow();
   const router = useRouter();
   const isMobile = useIsMobile();

   return (
      <div className="flex items-center gap-6 max-md:gap-4 hover:bg-neutralWhite-250 transition-colors px-8 max-md:px-4 py-4">
         <div
            onClick={() => router.push(ROUTES.main.profile(profile.username))}
            className="flex-1 flex items-center gap-6 max-md:gap-4 cursor-pointer"
         >
            <AvatarComponent
               avatarUrl={profile.avatarUrl}
               name={profile.name}
               isOnline={profile.isOnline}
               className="size-20"
            />

            <div className="">
               <div className="flex items-center gap-2 max-md:gap-1.5 max-lg:flex-col max-lg:items-start">
                  <p className="text-[16px] font-medium max-md:text-[14px] text-neutralBlack-900">
                     {profile.name}
                  </p>
                  <p className="textBody max-lg:hidden">/</p>
                  <p className="text-[14px] text-neutralBlack-600 max-md:text-[12px]">{`@${profile.username}`}</p>
               </div>
               {profile.bio && !isMobile && <div>{profile.bio}</div>}
            </div>
         </div>
         <ActionButtons
            link={ROUTES.main.profile(profile.username)}
            func={() =>
               toggleFollow({
                  profileId: profile.id,
                  isFollowed: profile.isFollowed ?? false,
               })
            }
            isFollowed={profile.isFollowed}
         />
      </div>
   );
};

export default ProfileSearchItem;
