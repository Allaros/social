import { uploadAttachment } from '../utils/upload-attachment';

import {
   AttachmentItem,
   AttachmentStatus,
} from '../hooks/queries/useAttachments';

type UploadSingleAttachmentFlowOptions = {
   attachment: AttachmentItem;

   chatIdentifier: string;

   onProgress?: (progress: number) => void;

   onStatusChange?: (
      status: AttachmentStatus,
      patch?: Partial<AttachmentItem>
   ) => void;
};

export const uploadSingleAttachment = async ({
   attachment,
   chatIdentifier,
   onProgress,
   onStatusChange,
}: UploadSingleAttachmentFlowOptions) => {
   try {
      const controller = new AbortController();

      onStatusChange?.('uploading', {
         progress: 0,
         error: undefined,
         controller,
      });

      const uploadedMetadata = await uploadAttachment(
         attachment,
         chatIdentifier,
         {
            signal: controller.signal,

            onProgress: (progress) => {
               onProgress?.(progress);
            },
         }
      );

      onStatusChange?.('uploaded', {
         progress: 100,
         uploadedMetadata,
         controller: undefined,
      });

      return uploadedMetadata;
   } catch (error) {
      if (error instanceof Error && error.message === 'Upload aborted') {
         return;
      }

      const message = error instanceof Error ? error.message : 'Upload failed';

      onStatusChange?.('failed', {
         error: message,
         controller: undefined,
      });

      throw error;
   }
};

type HandleMessageFilesOptions = {
   attachments: AttachmentItem[];

   chatIdentifier: string;

   onProgress?: (id: string, progress: number) => void;

   onStatusChange?: (
      id: string,
      status: AttachmentStatus,
      patch?: Partial<AttachmentItem>
   ) => void;
};

export const handleMessageFiles = async ({
   attachments,
   chatIdentifier,
   onProgress,
   onStatusChange,
}: HandleMessageFilesOptions) => {
   return Promise.allSettled(
      attachments.map((attachment) =>
         uploadSingleAttachment({
            attachment,
            chatIdentifier,

            onProgress: (progress) => {
               onProgress?.(attachment.id, progress);
            },

            onStatusChange: (status, patch) => {
               onStatusChange?.(attachment.id, status, patch);
            },
         })
      )
   );
};
