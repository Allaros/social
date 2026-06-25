import { uploadFiles } from '@/shared/handlers/uploadFiles';
import { messagesApi } from '../api/messages';

import { AttachmentItem } from '../hooks/queries/useAttachments';

export type UploadAttachmentResult = {
   storageKey: string;
   mimeType: string;
   size: number;
};

type UploadAttachmentOptions = {
   signal?: AbortSignal;

   onProgress?: (progress: number) => void;
};

export const uploadAttachment = async (
   attachment: AttachmentItem,
   chatIdentifier: string,
   options: UploadAttachmentOptions = {}
): Promise<UploadAttachmentResult> => {
   const { signedUrl, storageKey } = await messagesApi.getAttachmentUploadUrl(
      chatIdentifier,
      {
         mimeType: attachment.mimeType,
      }
   );

   const [uploaded] = await uploadFiles({
      files: [
         {
            file: attachment.file,
            signedUrl,
            storageKey,
         },
      ],

      signal: options.signal,

      onProgress: (_, progress) => {
         options.onProgress?.(progress);
      },
   });

   return uploaded;
};
