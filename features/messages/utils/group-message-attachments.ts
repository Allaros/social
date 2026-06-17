import { MessageAttachment } from '../types/messages.types';

export const groupMessageAttachments = (attachments: MessageAttachment[]) => {
   return attachments.reduce(
      (acc, attachment) => {
         if (attachment.mimeType.startsWith('image/')) {
            acc.mediaAttachments.push(attachment);

            return acc;
         }

         if (attachment.mimeType.startsWith('video/')) {
            acc.mediaAttachments.push(attachment);

            return acc;
         }

         if (attachment.mimeType.startsWith('audio/')) {
            acc.audioAttachments.push(attachment);

            return acc;
         }

         acc.fileAttachments.push(attachment);

         return acc;
      },
      {
         mediaAttachments: [] as MessageAttachment[],
         fileAttachments: [] as MessageAttachment[],
         audioAttachments: [] as MessageAttachment[],
      }
   );
};
