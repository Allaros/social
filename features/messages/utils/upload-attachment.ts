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
   const { signal, onProgress } = options;

   const { signedUrl, storageKey } = await messagesApi.getAttachmentUploadUrl(
      chatIdentifier,
      {
         mimeType: attachment.mimeType,
      }
   );

   await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const abortHandler = () => {
         xhr.abort();
      };

      signal?.addEventListener('abort', abortHandler);

      xhr.upload.onprogress = (event) => {
         if (event.lengthComputable && onProgress) {
            const progress = Math.round((event.loaded / event.total) * 100);

            onProgress(progress);
         }
      };

      xhr.onload = () => {
         signal?.removeEventListener('abort', abortHandler);

         if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
         } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
         }
      };

      xhr.onerror = () => {
         signal?.removeEventListener('abort', abortHandler);

         reject(new Error('Network error'));
      };

      xhr.onabort = () => {
         signal?.removeEventListener('abort', abortHandler);

         reject(new Error('Upload aborted'));
      };

      xhr.open('PUT', signedUrl);

      xhr.setRequestHeader('Content-Type', attachment.mimeType);

      xhr.send(attachment.file);
   });

   return {
      storageKey,
      mimeType: attachment.mimeType,
      size: attachment.size,
   };
};
