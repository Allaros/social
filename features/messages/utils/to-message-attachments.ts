import { AttachmentItem } from '../hooks/queries/useAttachments';

export const toMessageAttachments = (attachments: AttachmentItem[]) => {
   return attachments.flatMap((attachment) => {
      if (!attachment.uploadedMetadata) {
         return [];
      }

      return {
         storageKey: attachment.uploadedMetadata.storageKey,
         mimeType: attachment.uploadedMetadata.mimeType,
         size: attachment.uploadedMetadata.size,
         width: attachment.width,
         duration: attachment.duration,
         height: attachment.height,
      };
   });
};
