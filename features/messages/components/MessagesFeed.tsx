'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGetMessages } from '../hooks/queries/useGetMessages';
import EmptyPage from '@/shared/components/EmptyPage';
import Message from './message';
import { getMessageDateLabel } from '../utils/get-message-date';
import DateDivider from './DateDivider';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import { useReadMessagesTracker } from '../hooks/ui/useReadMessagesTracker';
import { useChatRealtimeConnection } from '@/features/websocket/hooks/useChatRealtimeConnection';
import { MessageStatusEnum } from '../types/messages.types';
import UnreadDivider from './UnreadDivider';
import { useChatControl } from '../hooks/ui/useChatControl';

const MessagesFeed = ({ chatIdentifier }: { chatIdentifier: string }) => {
   const { data, fetchNextPage, hasNextPage, isFetching } =
      useGetMessages(chatIdentifier);

   const messages = data?.pages.flatMap((page) => page.data) ?? [];

   const chatId = data?.pages[0].chatId;

   useChatRealtimeConnection(chatId);

   const { enqueue } = useReadMessagesTracker({
      chatIdentifier,
   });

   const { list, pagination, scroll } = useChatControl({
      messages,
      hasNextPage,
      isFetching,
      fetchNextPage,
   });

   const { orderedMessages, firstUnreadIndex } = list;

   if (!messages.length) {
      return <EmptyPage preset="emptyMessage" />;
   }

   return (
      <div className="flex relative flex-col px-2 py-4 overflow-y-auto max-h-full h-full scrollbar-custom">
         <div
            ref={scroll.containerRef}
            className="flex flex-col px-2 py-4 overflow-y-auto max-h-full h-full scrollbar-custom"
         >
            <div className="relative flex flex-col">
               {orderedMessages.map((message, index) => {
                  const previous = orderedMessages[index - 1];

                  const showDateDivider =
                     !previous ||
                     getMessageDateLabel(previous.createdAt) !==
                        getMessageDateLabel(message.createdAt);

                  return (
                     <React.Fragment key={message.id}>
                        {showDateDivider && (
                           <DateDivider date={message.createdAt} />
                        )}
                        {message.id === firstUnreadIndex && (
                           <div ref={scroll.unreadAnchorRef}>
                              <UnreadDivider />
                           </div>
                        )}
                        <div>
                           <Message
                              message={message}
                              onVisible={enqueue}
                              chatIdentifier={chatIdentifier}
                           />
                        </div>
                     </React.Fragment>
                  );
               })}

               <div
                  ref={scroll.viewportAnchorRef}
                  className="absolute left-0 right-0 bottom-0 h-10 pointer-events-none"
               />

               <div ref={scroll.bottomRef} />
            </div>
         </div>
      </div>
   );
};

export default MessagesFeed;
