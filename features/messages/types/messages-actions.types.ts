import { MessageResponseType } from './messages.types';

export type MessagePermissions = {
   canReply: boolean;
   canEdit: boolean;
   canDeleteForEveryone: boolean;
   canCopy: boolean;
   canForward: boolean;
};

export type MessageActions = {
   toggleSelection: () => void;
   replyToMessage: () => void;
   copyMessages: () => void;
   editMessage: () => void;
   deleteMessages: () => void;
   forwardMessages: () => void;
};

export type MessageComposerState =
   | {
        type: 'reply';
        message: MessageResponseType;
     }
   | {
        type: 'edit';
        message: MessageResponseType;
     }
   | {
        type: 'forward';
        messages: MessageResponseType[];
     }
   | null;

export type MessageComposerContextType = {
   action: MessageComposerState;

   startReply: (message: MessageResponseType) => void;

   startEdit: (message: MessageResponseType) => void;

   startForward: (messages: MessageResponseType[]) => void;

   clearAction: () => void;
};
