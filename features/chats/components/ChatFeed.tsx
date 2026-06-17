'use client';

import React from 'react';
import { useGetChats } from '../hooks/useGetChats';
import Chat from './Chat';
import EmptyPage from '@/shared/components/EmptyPage';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';

const ChatFeed = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetChats();

   const chats = data?.pages.flatMap((page) => page.data) ?? [];
   if (!chats.length) return <EmptyPage preset="emptyChats" />;
   return (
      <div className="py-2 flex flex-col">
         {chats.map((chat) => (
            <Chat chat={chat} key={chat.id} />
         ))}

         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />
      </div>
   );
};

export default ChatFeed;
