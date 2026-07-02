import { MessageResponseType } from './messages.types';

export type RealtimeMessageCreatedType = {
   senderProfileId: number;
   chatIdentifier: string | null;
   message: MessageResponseType;
   chatId: number;
};

export type RealtimeMessagesReadType = {
   chatId: number;
   chatIdentifier: string | null;
   messageIds: number[];
};

export type RealtimeMessagesDeletedType = {
   chatId: number;
   chatIdentifier: string | null;
   messageIds: number[];
};

export type RealtimeMessageEditedType = {
   messageId: number;
   newText: string;
   chatIdentifier: string | null;
};
