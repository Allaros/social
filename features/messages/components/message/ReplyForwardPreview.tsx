import React from 'react';
import { ForwardedFrom, MessageReply } from '../../types/messages.types';
import { MessageMetaMode } from '../../hooks/ui/useMessageMetaLayout';
import { cn } from '@/shared/lib/utils';

const ReplyForwardPreview = ({
   reply,
   mode,
   forward,
   text,
   isOwn,
}: {
   mode: MessageMetaMode;
   reply?: MessageReply | null;
   forward?: ForwardedFrom | null;
   text?: string | null;
   isOwn: boolean;
}) => {
   const replyText = reply?.text?.trim();
   return (
      <div
         className={cn(
            'px-2 py-1 rounded-sm w-full bg-neutralWhite-500/20 text-neutralWhite-100',

            !text ? 'mb-1' : ''
         )}
      >
         {!!reply && (
            <>
               <div className="text-[14px]/[100%] font-medium pb-1">
                  {reply.authorName}
               </div>
               <div
                  className={cn(
                     'truncate text-[12px]/[100%] ',
                     mode === 'inline' ? 'max-w-40' : ''
                  )}
               >
                  {replyText}
               </div>
            </>
         )}
         {!!forward && (
            <div className="truncate text-[12px]/[100%] ">
               Переслано от{' '}
               <span className="font-medium">
                  {forward.sender.profile?.name ?? 'Инкогнито'}
               </span>
            </div>
         )}
      </div>
   );
};

export default ReplyForwardPreview;
