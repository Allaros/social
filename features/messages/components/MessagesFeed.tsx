'use client';

import React from 'react';
import { useGetMessages } from '../hooks/queries/useGetMessages';
import EmptyPage from '@/shared/components/EmptyPage';
import Message from './message';
import { getMessageDateLabel } from '../utils/get-message-date';
import DateDivider from './DateDivider';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import { useReadMessagesTracker } from '../hooks/ui/useReadMessagesTracker';

const MessagesFeed = ({ chatIdentifier }: { chatIdentifier: string }) => {
   const { data, fetchNextPage, hasNextPage, isFetching } =
      useGetMessages(chatIdentifier);
   const messages = data?.pages.flatMap((page) => page.data) ?? [];
   const { enqueue } = useReadMessagesTracker({
      chatIdentifier,
   });

   if (!messages.length) return <EmptyPage preset="emptyMessage" />;
   const orderedMessages = [...messages].reverse();

   return (
      <div className="flex flex-col px-2 py-4 overflow-y-auto max-h-full h-full scrollbar-custom">
         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />

         {orderedMessages.map((message, index) => {
            const previousMessage = orderedMessages[index - 1];

            const showDateDivider =
               !previousMessage ||
               getMessageDateLabel(previousMessage.createdAt) !==
                  getMessageDateLabel(message.createdAt);

            return (
               <React.Fragment key={message.id}>
                  {showDateDivider && <DateDivider date={message.createdAt} />}

                  <Message
                     message={message}
                     onVisible={enqueue}
                     chatIdentifier={chatIdentifier}
                  />
               </React.Fragment>
            );
         })}
      </div>
   );
};

export default MessagesFeed;
