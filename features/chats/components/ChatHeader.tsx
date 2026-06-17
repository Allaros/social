'use client';

import React, { useEffect, useState } from 'react';
import { useGetActiveChat } from '../hooks/useGetActiveChat';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import { formatLastSeen } from '@/shared/utils/dating';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import ChatActionsPanel from './ChatActionsPanel';
import { ArrowLeft } from 'lucide-react';
import ROUTES from '@/shared/constants/routes';

const ChatHeader = () => {
   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat') ?? undefined;

   const [visibleChat, setVisibleChat] = useState<string | undefined>(
      undefined
   );

   useEffect(() => {
      if (activeIdentifier) {
         setVisibleChat(activeIdentifier);
      }
   }, [activeIdentifier]);
   const isMobile = useIsMobile();
   const router = useRouter();

   const { data: chat } = useGetActiveChat(visibleChat);

   if (!visibleChat) return null;

   if (!chat) return null;

   return (
      <div className="py-2 px-4 flex justify-between gap-4 items-center relative">
         <div className="flex items-center gap-2">
            <div className="md:hidden size-12">
               <AvatarComponent avatarUrl={chat?.avatarUrl} name={chat?.name} />
            </div>
            <div>
               <p className="h6">{chat?.name ?? chat?.title}</p>
               <p className="textLabel">
                  {chat?.type === 'direct'
                     ? formatLastSeen({
                          isOnline: chat.isOnline,
                          lastSeenAt: chat.lastSeenAt,
                       })
                     : chat?.membersCount}
               </p>
            </div>
         </div>
         <ChatActionsPanel chatIdentifier={visibleChat} />
         {isMobile && (
            <button
               onClick={() => router.replace(ROUTES.main.chats)}
               className="text-neutralBlack-500 p-2 rounded-sm bg-neutralWhite-400"
            >
               <ArrowLeft />
            </button>
         )}
      </div>
   );
};

export default ChatHeader;
