'use client';

import React from 'react';
import { useGetChats } from '../hooks/useGetChats';
import Chat from './Chat';
import EmptyPage from '@/shared/components/EmptyPage';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import CreateGroupChatDialog from './CreateGroupChatDialog';

const ChatFeed = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useGetChats();

   const chats = data?.pages.flatMap((page) => page.data) ?? [];
   if (!chats.length) return <EmptyPage preset="emptyChats" />;
   return (
      <div className="flex flex-col h-full">
         <div className="py-2 flex-1 flex flex-col">
            {chats.map((chat) => (
               <Chat chat={chat} key={chat.id} />
            ))}
            <LoadMoreTrigger
               fetchNextPage={fetchNextPage}
               hasNextPage={hasNextPage}
               isFetching={isFetching}
            />
         </div>
         <CreateGroupChatDialog>
            <div className="w-full h-12 cursor-pointer hover:bg-neutralWhite-500 transition-colors flex items-center justify-center text-center bg-neutralWhite-400 ">
               <p className="textBody">Создать групповой чат</p>
            </div>
         </CreateGroupChatDialog>
      </div>
   );
};

export default ChatFeed;
