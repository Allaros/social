import { createContext, useState } from 'react';
import { MessageResponseType } from '../types/messages.types';
import {
   MessageComposerContextType,
   MessageComposerState,
} from '../types/messages-actions.types';

export const MessageComposerContext =
   createContext<MessageComposerContextType | null>(null);

export const MessageComposerProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [action, setAction] = useState<MessageComposerState>(null);

   const startReply = (message: MessageResponseType) => {
      setAction({
         type: 'reply',
         message,
      });
   };

   const startEdit = (message: MessageResponseType) => {
      setAction({
         type: 'edit',
         message,
      });
   };

   const startForward = (messages: MessageResponseType[]) => {
      setAction({
         type: 'forward',
         messages,
      });
   };

   const clearAction = () => {
      setAction(null);
   };

   return (
      <MessageComposerContext.Provider
         value={{
            action,

            startReply,
            startEdit,
            startForward,

            clearAction,
         }}
      >
         {children}
      </MessageComposerContext.Provider>
   );
};
