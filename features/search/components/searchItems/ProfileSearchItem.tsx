import Image from 'next/image';
import { ProfileItemResponse } from '../../types/response';
import UnknownImg from '@/public/icons/Incognito.svg';
import ActionButtons from './ActionButtons';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import ROUTES from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';

const ProfileSearchItem = ({
   id,
   name,
   username,
   avatarUrl,
   bio,
}: ProfileItemResponse) => {
   const router = useRouter();
   const isMobile = useIsMobile();
   return (
      <div className="flex items-center gap-6 max-md:gap-4 hover:bg-neutralWhite-250 transition-colors px-8 max-md:px-4 py-4">
         <div
            onClick={
               isMobile
                  ? () => router.push(ROUTES.main.profile(username))
                  : (e) => e.preventDefault()
            }
            className="flex-1 flex items-center gap-6 max-md:gap-4"
         >
            <Image
               src={avatarUrl ?? UnknownImg}
               width={isMobile ? 40 : 96}
               height={isMobile ? 40 : 96}
               alt="Profile image"
               className="rounded-full"
            />
            <div className="">
               <div className="flex items-center gap-2 max-md:gap-1.5 max-lg:flex-col max-lg:items-start">
                  <p className="text-[16px] font-medium max-md:text-[14px] text-neutralBlack-900">
                     {name}
                  </p>
                  <p className="textBody max-lg:hidden">/</p>
                  <p className="text-[14px] text-neutralBlack-600 max-md:text-[12px]">{`@${username}`}</p>
               </div>
               {bio && !isMobile && <div>{bio}</div>}
            </div>
         </div>
         <ActionButtons
            link={ROUTES.main.profile(username)}
            func={() => console.log('friend')}
         />
      </div>
   );
};

export default ProfileSearchItem;
