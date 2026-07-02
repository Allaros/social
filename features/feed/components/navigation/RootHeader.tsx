import ROUTES from '@/shared/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icons/Logomark-2.svg';
import GlobalSearch from '@/features/search/GlobalSearch';
import AccountButtons from './AccountButtons';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import MessagesIco from '@/public/icons/Send.svg';
import Logo2 from '@/public/icons/Logomark.svg';
import { cn } from '@/shared/lib/utils';
import { useUnreadState } from '@/features/chats/hooks/useUnreadState';
const RootHeader = ({ hideHeader }: { hideHeader: boolean }) => {
   const isMobile = useIsMobile();

   const { data: unreadChatsState } = useUnreadState();

   return (
      <div
         className={cn(
            'fixed w-full top-0 left-0 bg-neutralWhite-100 z-20',
            hideHeader && 'hidden'
         )}
      >
         <nav className="grid max-w-7xl mx-auto grid-cols-[3fr_6fr_3fr]  max-lg:grid-cols-[3fr_5fr_3fr] gap-1.5 max-md:grid-cols-[1fr_max-content] items-center py-4.5 px-6 box-border">
            <Link className="flex items-center gap-3" href={ROUTES.home}>
               <Image
                  src={isMobile ? Logo2 : Logo}
                  alt="Logo"
                  width={isMobile ? 32 : 40}
                  height={isMobile ? 32 : 40}
               ></Image>
               <p className="font-manrope text-[18px]">Social</p>
            </Link>
            {isMobile ? (
               <Link href={ROUTES.main.chats} className="relative">
                  <Image
                     src={MessagesIco}
                     alt="messages"
                     width={20}
                     height={20}
                  />
                  {unreadChatsState &&
                     unreadChatsState.unreadChatsCount +
                        unreadChatsState.unreadMutedChatsCount >
                        0 && (
                        <div
                           className={cn(
                              'textLabel-medium text-neutralWhite-100  rounded-full size-5 flex items-center justify-center',
                              unreadChatsState.unreadChatsCount === 0
                                 ? 'bg-neutralBlack-500'
                                 : 'bg-primary-900',
                              'max-lg:absolute max-lg:r-0 max-lg:t-0 max-lg:size-4 max-lg:-translate-y-3 max-lg:translate-x-3'
                           )}
                        >
                           {unreadChatsState.unreadChatsCount +
                              unreadChatsState.unreadMutedChatsCount}
                        </div>
                     )}
               </Link>
            ) : (
               <>
                  <GlobalSearch />
                  <AccountButtons className="justify-self-end" />
               </>
            )}
         </nav>
      </div>
   );
};

export default RootHeader;
