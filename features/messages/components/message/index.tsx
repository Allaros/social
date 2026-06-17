'use client';

import React, { useEffect, useRef } from 'react';
import {
   MessageResponseType,
   MessageStatusEnum,
} from '../../types/messages.types';
import Sender from './Sender';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import ReplyForwardPreview from './ReplyForwardPreview';
import MessageBody from './MessageBody';
import { formatMessageTime } from '@/shared/utils/dating';
import { MessageStatusIndicator } from './MessageStatusIndicator';
import { getMessageViewPreset } from '../../utils/get-message-preset';
import { cn } from '@/shared/lib/utils';
import { containerStyles } from '../../constant/container-styles';
import { Check } from 'lucide-react';
import { useMessageViewModel } from '../../hooks/ui/useMessageViewModel';
import { getContextMenuActions } from '../../helpers/get-context-menu-actions';
import { MessageMenu } from './MessageMenu';
import { useMessageMetaLayout } from '../../hooks/ui/useMessageMetaLayout';

const Message = ({
   message,
   onVisible,
   chatIdentifier,
}: {
   message: MessageResponseType;
   onVisible?: (messageId: number) => void;
   chatIdentifier: string;
}) => {
   const isMobile = useIsMobile();
   const messageRef = useRef<HTMLDivElement>(null);

   const { actions, interactions, permissions, selection } =
      useMessageViewModel({ message, chatIdentifier });

   const preset = getMessageViewPreset(message.content, message.attachments);

   useEffect(() => {
      if (!messageRef.current || !onVisible) return;

      if (message.isOwn) return;

      if (message.status === MessageStatusEnum.READ) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (!entry?.isIntersecting) return;

            onVisible(message.id);

            observer.disconnect();
         },
         {
            threshold: 0.6,
         }
      );

      observer.observe(messageRef.current);

      return () => observer.disconnect();
   }, [message.id, message.isOwn, message.status, onVisible]);

   const { containerRef, layout, metaRef } = useMessageMetaLayout(message);

   const contextMenuActions = getContextMenuActions({
      actions,
      isSelected: selection.isSelected,
      permissions,
      isSelectionMode: selection.isSelectionMode,
   });

   return (
      <MessageMenu actions={contextMenuActions}>
         <div
            ref={messageRef}
            className={cn(
               'flex gap-1 transition-all duration-300 py-1.5',
               message.isOwn ? 'flex-row-reverse' : 'flex-row',
               selection.isSelected ? 'bg-primary-100' : 'bg-transparent'
            )}
            {...interactions}
         >
            <Sender messageSender={message.sender?.profile} />
            <div
               ref={containerRef}
               className={cn(
                  `rounded-sm textBody self-center max-w-[60%] relative ${message.isOwn ? 'bg-primary-900 text-neutralWhite-100' : 'text-neutralWhite-100 bg-neutralBlack-900'}`,
                  containerStyles[preset]
               )}
            >
               {(message.reply || message.forwardedFrom) && (
                  <ReplyForwardPreview
                     mode={layout.mode}
                     reply={message.reply}
                     forward={message.forwardedFrom}
                     text={message.content?.text}
                     isOwn={message.isOwn}
                  />
               )}
               <div
                  style={{
                     paddingRight: layout.contentPaddingRight,
                     paddingBottom: layout.contentPaddingBottom,
                  }}
               >
                  <MessageBody
                     content={message.content}
                     attachments={message.attachments}
                  />
                  <div
                     ref={metaRef}
                     className={cn(
                        'absolute right-0 flex items-center gap-1 justify-end',
                        layout.metaClassName
                     )}
                  >
                     <div className="textLabel whitespace-nowrap">
                        {formatMessageTime(message.createdAt)}{' '}
                        {message.editedAt && <span>(ред.)</span>}
                     </div>
                     <MessageStatusIndicator status={message.status} />
                  </div>
               </div>
            </div>
            <div
               className={cn(
                  ' border border-neutralBlack-300 rounded-full text-neutralWhite-100 self-end p-0.5 m-1 transition-all duration-200',
                  selection.isSelectionMode ? 'opacity-100' : 'opacity-0',
                  selection.isSelected ? 'bg-primary-800' : 'bg-transparent'
               )}
            >
               <Check
                  size={16}
                  className={
                     !selection.isSelected ? 'opacity-0' : 'opacity-100'
                  }
               />
            </div>
         </div>
      </MessageMenu>
   );
};

export default Message;
