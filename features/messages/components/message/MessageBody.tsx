import React from 'react';
import { MessageAttachment, MessageContent } from '../../types/messages.types';
import MessageAttachments from './MessageAttachments';

const MessageBody = ({
   attachments,
   content,
}: {
   content: MessageContent | null;
   attachments: MessageAttachment[];
}) => {
   return (
      <div>
         {content?.text && (
            <div className="wrap-break-word">{content.text}</div>
         )}
         {!attachments.length ? null : (
            <MessageAttachments attachments={attachments} />
         )}
      </div>
   );
};

export default MessageBody;
