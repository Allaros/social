import { MessagePermissions } from '../types/messages-actions.types';
import { MessageResponseType } from '../types/messages.types';

export const getMessagePermissions = (
   targetMessages: MessageResponseType[]
): MessagePermissions => {
   const hasMessages = targetMessages.length > 0;

   const singleMessage =
      targetMessages.length === 1 ? targetMessages[0] : undefined;

   return {
      canReply: !!singleMessage,

      canEdit:
         !!singleMessage && singleMessage.isOwn && !singleMessage.forwardedFrom,

      canDeleteForEveryone:
         hasMessages && targetMessages.every((message) => message.isOwn),

      canCopy: !!singleMessage,

      canForward: hasMessages,
   };
};
