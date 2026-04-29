import { useProfile } from '@/features/profile/hooks/useProfile';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { useLenisInstance } from '@/shared/hooks/useLenisInstance';
import { useScrollDirection } from '@/shared/hooks/useScrollDirection';
import Image from 'next/image';
import AvatarComponent from '../AvatarComponent';
import NotificationsImg from '@/public/icons/Notification.svg';
import SearchImg from '@/public/icons/Search.svg';
import HomeImg from '@/public/icons/Home.svg';
import { useDrawer } from '@/features/drawer/provider/drawerProvider';

const LinksPanel = () => {
   const isMobile = useIsMobile();
   const profile = useProfile();
   const { openSearch } = useDrawer();

   const lenis = useLenisInstance();
   const direction = useScrollDirection(lenis);

   if (!isMobile) return null;

   return (
      <div
         className={`fixed bottom-0 left-0 w-full transition-transform  duration-500 ${direction === 'down' ? 'translate-y-full' : 'translate-y-0'}`}
      >
         <ul className="py-1.5 px-4 flex items-center justify-between gap-4 bg-neutralWhite-100 ">
            <li className="p-4">
               <Link href={ROUTES.home}>
                  <Image src={HomeImg} alt={'home'} width={22} height={22} />
               </Link>
            </li>
            <li className="p-4">
               <button
                  onClick={openSearch}
                  className="flex items-center justify-center"
               >
                  <Image
                     src={SearchImg}
                     alt={'search'}
                     width={22}
                     height={22}
                  />
               </button>
            </li>

            <li className="p-4">
               <Link href={ROUTES.home}>
                  <Image
                     src={NotificationsImg}
                     alt={'notifications'}
                     width={22}
                     height={22}
                  />
               </Link>
            </li>

            <li className="p-4">
               <Link
                  href={
                     profile?.username
                        ? ROUTES.main.profile(profile?.username)
                        : ROUTES.home
                  }
               >
                  <AvatarComponent
                     avatarUrl={profile?.avatarUrl}
                     name={profile?.name}
                     className="max-w-6 max-h-6"
                  />
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default LinksPanel;
