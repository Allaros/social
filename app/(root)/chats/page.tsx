'use client';

import MessageForm from '@/features/messages/components/MessageForm';
import MessagesFeed from '@/features/messages/components/MessagesFeed';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const ChatsPage = () => {
   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat');

   const [visibleChat, setVisibleChat] = useState<string | null>(null);

   useEffect(() => {
      if (activeIdentifier) {
         setVisibleChat(activeIdentifier);
      }
   }, [activeIdentifier]);

   if (!visibleChat) {
      return (
         <div className="flex items-center justify-center text-center h5 h-full">
            Выберите чат, либо создайте новый,
            <br />
            написав кому-нибудь
         </div>
      );
   }

   return (
      <div className="flex flex-col h-full min-h-0 overflow-hidden">
         <MessagesFeed chatIdentifier={visibleChat} />
         <MessageForm chatIdentifier={visibleChat} />
      </div>
   );
};

export default ChatsPage;
