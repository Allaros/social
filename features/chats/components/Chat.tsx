import React from 'react';
import { ChatListItem } from '../types/chats.types';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import { formatPostDate } from '@/shared/utils/dating';
import { useParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';

const Chat = ({ chat }: { chat: ChatListItem }) => {
   const titleFallback =
      chat.type === 'direct' ? 'Неизвестный' : `Чат ${chat.id}`;

   const params = useParams();
   const activeIdentifier = params?.identifier as string | undefined;
   const isActive = activeIdentifier === chat.identifier;

   return (
      <Link
         href={ROUTES.main.chat(chat.identifier)}
         className={cn(
            `flex items-center gap-4 transition-colors duration-300 hover:bg-neutralWhite-400 ${isActive ? 'bg-neutralWhite-500' : 'bg-neutralWhite-100'}`,
            '',
            'md:px-4 md:py-2'
         )}
      >
         <AvatarComponent
            avatarUrl={chat.avatarUrl}
            name={chat.title}
            isOnline={chat.isOnline}
            className="size-12"
         ></AvatarComponent>

         <div className="flex flex-col ">
            <div className="h6">{chat.title ?? titleFallback}</div>
            {chat.lastMessageAt && (
               <div className="textLabel text-neutralBlack-600">
                  <p className="line-clamp-1">{`${chat.lastMessage!.senderName}: ${chat.lastMessage!.text}`}</p>
                  <p>{formatPostDate(chat.lastMessageAt)}</p>
               </div>
            )}
         </div>
      </Link>
   );
};

export default Chat;
