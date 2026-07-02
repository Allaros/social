'use client';
import { useMe } from '@/features/auth/hooks/useMe';
import NotificationsIco from '@/public/icons/Notification.svg';
import MessagesIco from '@/public/icons/Send.svg';
import HomeIco from '@/public/icons/Home.svg';
import ProfileIco from '@/public/icons/User.svg';
import Image from 'next/image';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { useNotificationsState } from '@/features/notifications/hooks/useNotificationsCount';
import { Users } from 'lucide-react';
import { useUnreadState } from '@/features/chats/hooks/useUnreadState';

const UserLinks = () => {
   const { data: user } = useMe();
   const { data: notificationsState } = useNotificationsState();
   const { data: unreadChatsState } = useUnreadState();

   const username = user?.profile?.username;
   return (
      <ul className={cn('flex flex-col', 'items-center', 'lg:items-stretch')}>
         <li className="relative">
            <Link
               href={ROUTES.home}
               className={cn(
                  'flex gap-2.5 py-3.5 items-center textBody-medium text-neutralBlack-600 hover:bg-neutralWhite-400 cursor-pointer',
                  'px-4',
                  'lg:px-8'
               )}
            >
               <Image src={HomeIco} alt="home" width={20} height={20} />
               <p className="flex-1 max-lg:hidden">Главная</p>
            </Link>
            <div className="h-px bg-neutralWhite-400 mx-8 max-lg:mx-4"></div>
         </li>
         <li className="relative">
            <Link
               href={username ? ROUTES.main.profile(username) : ROUTES.home}
               className={cn(
                  'flex gap-2.5 py-3.5 items-center textBody-medium text-neutralBlack-600 hover:bg-neutralWhite-400 cursor-pointer',
                  'px-4',
                  'lg:px-8'
               )}
            >
               <Image src={ProfileIco} alt="profile" width={20} height={20} />
               <p className="flex-1 max-lg:hidden">Профиль</p>
            </Link>
            <div className="h-px bg-neutralWhite-400 mx-8 max-lg:mx-4"></div>
         </li>
         <li className="relative">
            <Link
               href={ROUTES.main.chats}
               className={cn(
                  'flex gap-2.5 py-3.5 items-center textBody-medium text-neutralBlack-600 hover:bg-neutralWhite-400 cursor-pointer',
                  'px-4',
                  'lg:px-8'
               )}
            >
               <Image src={MessagesIco} alt="messages" width={20} height={20} />
               <p className="flex-1 max-lg:hidden">Сообщения</p>
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
                           'max-lg:absolute max-lg:r-0 max-lg:t-0 max-lg:size-4 max-lg:-translate-y-2 max-lg:translate-x-3.5'
                        )}
                     >
                        {unreadChatsState.unreadChatsCount +
                           unreadChatsState.unreadMutedChatsCount}
                     </div>
                  )}
            </Link>
            <div className="h-px bg-neutralWhite-400 mx-8 max-lg:mx-4"></div>
         </li>
         <li className="relative">
            <Link
               href={ROUTES.main.notifications}
               className={cn(
                  'flex gap-2.5 py-3.5 items-center textBody-medium text-neutralBlack-600 hover:bg-neutralWhite-400 cursor-pointer',
                  'px-4',
                  'lg:px-8'
               )}
            >
               <Image
                  src={NotificationsIco}
                  alt="notifications"
                  width={20}
                  height={20}
               />
               <p className="flex-1 max-lg:hidden">Уведомления</p>
               {notificationsState && notificationsState.unseenCount > 0 && (
                  <div
                     className={cn(
                        'textLabel-medium text-neutralWhite-100 bg-primary-900 rounded-full size-5 flex items-center justify-center',
                        'max-lg:absolute max-lg:r-0 max-lg:t-0 max-lg:size-4 max-lg:-translate-y-2 max-lg:translate-x-3.5'
                     )}
                  >
                     {notificationsState.unseenCount}
                  </div>
               )}
            </Link>
            <div className="h-px bg-neutralWhite-400 mx-8 max-lg:mx-4"></div>
         </li>
         <li className="relative">
            <Link
               href={ROUTES.main.friends}
               className={cn(
                  'flex gap-2.5 py-3.5 items-center textBody-medium text-neutralBlack-600 hover:bg-neutralWhite-400 cursor-pointer',
                  'px-4',
                  'lg:px-8'
               )}
            >
               <Users />
               <p className="flex-1 max-lg:hidden">Подписки</p>
            </Link>
         </li>
      </ul>
   );
};

export default UserLinks;
