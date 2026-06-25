'use client';

import { useGetActiveChat } from '@/features/chats/hooks/useGetActiveChat';
import MessageForm from '@/features/messages/components/MessageForm';
import MessagesFeed from '@/features/messages/components/MessagesFeed';
import MessagesSkeleton from '@/features/messages/components/MessagesSkeleton';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const ChatsPage = () => {
   const searchParams = useSearchParams();

   const isMobile = useIsMobile();

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

   const { data: chat, isPending } = useGetActiveChat(chatIdentifier);

   if (!chatIdentifier || !chat) {
      return (
         <div className="flex items-center justify-center text-center h5 h-full">
            Выберите чат, либо создайте новый,
            <br />
            написав кому-нибудь
         </div>
      );
   }

   if (!chat || isPending)
      return (
         <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <MessagesSkeleton />
            <MessageForm
               chatIdentifier={chatIdentifier}
               canSendMessages={true}
               isLeft={false}
               isPending={isPending}
            />
         </div>
      );

   return (
      <div className="flex flex-col h-full min-h-0 overflow-hidden">
         <MessagesFeed chatIdentifier={chatIdentifier} />
         <MessageForm
            chatIdentifier={chatIdentifier}
            canSendMessages={chat!.canSendMessages}
            isLeft={chat!.isLeft}
            isPending={isPending}
         />
      </div>
   );
};

export default ChatsPage;
