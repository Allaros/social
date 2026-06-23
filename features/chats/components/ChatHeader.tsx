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

import InfoDialog from './InfoDialog';

const ChatHeader = () => {
   const searchParams = useSearchParams();

   const isMobile = useIsMobile();

   const router = useRouter();

   const activeIdentifier = searchParams.get('chat');

   const [visibleChat, setVisibleChat] = useState<string | undefined>(
      undefined
   );

   useEffect(() => {
      if (activeIdentifier) {
         setVisibleChat(activeIdentifier);
      }
   }, [activeIdentifier]);

   const chatIdentifier = isMobile ? visibleChat : activeIdentifier;

   const { data: chat } = useGetActiveChat(chatIdentifier);

   if (!chatIdentifier) return null;

   if (!chat) return null;

   return (
      <div className="py-2 px-4 flex justify-between gap-4 items-center relative">
         <InfoDialog chatInfo={chat}>
            <div className="flex items-center gap-2">
               <div className="md:hidden size-12">
                  <AvatarComponent
                     avatarUrl={chat?.avatarUrl}
                     name={chat?.name}
                  />
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
         </InfoDialog>

         <ChatActionsPanel chatIdentifier={chatIdentifier} />
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
