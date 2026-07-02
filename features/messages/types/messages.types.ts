export type AttachmentUploadUrlResponse = {
   signedUrl: string;
   storageKey: string;
};

export type MessageSenderProfile = {
   id: number;
   username: string;
   name: string;
   avatarUrl: string | null;
};

export type MessageSender = {
   id: number;
   profile: MessageSenderProfile | null;
};

export type MessageContent = {
   text: string | null;
};

export type MessageAttachment = {
   id: number;
   type: MessagesAttachmentEnum;
   mimeType: string;
   size: number;
   width: number | null;
   height: number | null;
   duration: number | null;
   url: string;
};

export type MessageReply = {
   id: number;
   text: string | null;
   authorName: string;
};

export type ForwardedFrom = {
   id: number;
   sender: MessageSender;
};

export type MessageResponseType = {
   id: number;
   type: MessagesTypeEnum;
   createdAt: string | Date;
   isOwn: boolean;
   status: MessageStatusEnum;
   sender: MessageSender;
   content: MessageContent | null;
   attachments: MessageAttachment[];
   editedAt?: Date;
   reply: MessageReply | null;
   forwardedFrom: ForwardedFrom | null;
   clientId?: string;
};

export type MessagesPage = {
   data: MessageResponseType[];
   chatId: number;
   lastReadMessageId: number | null;
   nextCursor: string | null;
};

export type MessagesInfiniteData = {
   pages: MessagesPage[];
   pageParams: (string | undefined)[];
};

export enum MessagesAttachmentEnum {
   IMAGE = 'image',
   VIDEO = 'video',
   VOICE = 'voice',
   FILE = 'file',
   AUDIO = 'audio',
}

export enum MessagesTypeEnum {
   DEFAULT = 'default',
   SYSTEM = 'system',
   CALL = 'call',
}

export enum MessageStatusEnum {
   SENDING = 'sending',
   SENT = 'sent',
   FAILED = 'failed',
   READ = 'read',
}

export type MessageViewPreset = 'text' | 'media' | 'mixed';

export type ForwardMessagesResponse = {
   id: number;
   clientId: string;
   createdAt: string;
};
