import { AttachmentItem } from '../../hooks/queries/useAttachments';
import {
   MessageAttachment,
   MessageResponseType,
   MessagesAttachmentEnum,
   MessageStatusEnum,
   MessagesTypeEnum,
} from '../../types/messages.types';

export const createOptimisticForwardMessages = ({
   messages,
   profile,
}: {
   messages: MessageResponseType[];
   profile: ProfileResponce;
}): MessageResponseType[] => {
   const now = new Date();

   return messages.map((message, index) => ({
      ...message,

      id: -(Date.now() + index),

      isOwn: true,

      status: MessageStatusEnum.SENDING,

      createdAt: now,

      sender: {
         id: profile.id,
         profile: {
            avatarUrl: profile.avatarUrl ?? null,
            id: profile.id,
            name: profile.name,
            username: profile.username,
         },
      },

      forwardedFrom: message.forwardedFrom ?? {
         id: message.id,
         sender: message.sender,
      },
   }));
};

const resolveAttachmentType = (mimeType: string): MessagesAttachmentEnum => {
   if (mimeType.startsWith('image/')) {
      return MessagesAttachmentEnum.IMAGE;
   }

   if (mimeType.startsWith('video/')) {
      return MessagesAttachmentEnum.VIDEO;
   }

   if (mimeType.startsWith('audio/')) {
      return MessagesAttachmentEnum.AUDIO;
   }

   return MessagesAttachmentEnum.FILE;
};

export const createOptimisticMessage = ({
   clientId,
   text,
   attachments,
   profile,
}: {
   clientId: string;
   text?: string;
   attachments?: AttachmentItem[];
   profile: ProfileResponce;
}): MessageResponseType => ({
   id: -Date.now(),

   clientId,

   type: MessagesTypeEnum.DEFAULT,

   createdAt: new Date(),

   isOwn: true,

   status: MessageStatusEnum.SENDING,

   sender: {
      id: profile.id,
      profile: {
         id: profile.id,
         username: profile.username,
         name: profile.name,
         avatarUrl: profile.avatarUrl ?? null,
      },
   },

   content: text
      ? {
           text,
        }
      : null,

   attachments:
      attachments?.map((attachment, index) => ({
         id: -(Date.now() + index),

         mimeType: attachment.mimeType,

         size: attachment.size,

         type: resolveAttachmentType(attachment.mimeType),

         width: null,
         height: null,
         duration: null,

         url: attachment.previewUrl,
      })) ?? [],

   reply: null,

   forwardedFrom: null,
});
