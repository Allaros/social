import React, { useEffect } from 'react';
import { ChatListItem } from '../types/chats.types';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import { formatPostDate } from '@/shared/utils/dating';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { MessagesTypeEnum } from '@/features/messages/types/messages.types';
import { useChatRealtimeConnection } from '@/features/websocket/hooks/useChatRealtimeConnection';

const Chat = ({ chat }: { chat: ChatListItem }) => {
   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat');

   const titleFallback =
      chat.type === 'direct' ? 'Неизвестный' : `Чат ${chat.id}`;

   const isActive = activeIdentifier === chat.identifier;

   return (
      <Link
         href={ROUTES.main.chat(chat.identifier)}
         className={cn(
            `flex py-2 items-center max-lg:justify-center max-md:justify-start gap-4 px-4 transition-colors duration-300 hover:bg-neutralWhite-400 ${isActive ? 'bg-neutralWhite-500' : 'bg-neutralWhite-100'}`,
            '',
            ''
         )}
      >
         <div className="max-w-12 max-lg:flex-1">
            <AvatarComponent
               avatarUrl={chat.avatarUrl}
               name={chat.title}
               isOnline={chat.isOnline}
               className="size-12"
            ></AvatarComponent>
         </div>

         <div className="flex flex-col max-lg:hidden max-md:flex ">
            <div className="h6">{chat.title ?? titleFallback}</div>
            {chat.lastMessage?.createdAt && chat.lastMessage.text && (
               <div className="textLabel text-neutralBlack-600">
                  <p className="line-clamp-1">{`${!chat.lastMessage.senderName || chat.lastMessage.type === MessagesTypeEnum.SYSTEM ? '' : `${chat.lastMessage.senderName}:`} ${chat.lastMessage.text}`}</p>
                  <p>{formatPostDate(chat.lastMessage.createdAt)}</p>
               </div>
            )}
         </div>
      </Link>
   );
};

export default Chat;
