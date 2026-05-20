export type GetMessagesParams = {
   cursor?: string;
   limit?: number;
   query?: string;
};

export type MessageAttachmentPayload = {
   storageKey: string;
   mimeType: string;
   size: number;
};

export type CreateMessagePayload = {
   text?: string;
   attachments?: MessageAttachmentPayload[];
   replyToMessageId?: number;
};

export type GetAttachmentUploadUrlPayload = {
   mimeType: string;
};

export type AttachmentUploadUrlResponse = {
   signedUrl: string;
   storageKey: string;
};
