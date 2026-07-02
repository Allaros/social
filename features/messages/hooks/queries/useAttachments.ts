import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export type AttachmentStatus = 'queued' | 'uploading' | 'uploaded' | 'failed';

export type AttachmentItem = {
   id: string;
   file: File;
   previewUrl: string | null;
   mimeType: string;
   size: number;
   width: number | null;
   height: number | null;
   duration: number | null;
   status: AttachmentStatus;
   progress: number;
   uploadedMetadata?: {
      storageKey: string;
      mimeType: string;
      size: number;
   };
   error?: string;
   controller?: AbortController;
};

const MAX_ATTACHMENTS = 10;
const MAX_SIZE_MB = 25;

const ALLOWED_MIME_TYPES = [
   'image/jpeg',
   'image/png',
   'image/webp',
   'video/mp4',
   'audio/mpeg',
   'audio/ogg',
   'audio/webm',
   'application/pdf',
];

const createAttachmentItem = (file: File): AttachmentItem | null => {
   const normalizedMimeType = file.type.split(';')[0];
   if (!ALLOWED_MIME_TYPES.includes(normalizedMimeType)) {
      toast.error(`Тип файла не поддерживается: ${normalizedMimeType}`);

      return null;
   }

   if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Файл слишком большой (максимум ${MAX_SIZE_MB}MB)`);

      return null;
   }

   const isMedia =
      file.type.startsWith('image/') || file.type.startsWith('video/');

   return {
      id: crypto.randomUUID(),
      file,
      previewUrl: isMedia ? URL.createObjectURL(file) : null,
      mimeType: normalizedMimeType,
      size: file.size,
      status: 'queued',
      progress: 0,
      duration: null,
      height: null,
      width: null,
   };
};

export const useAttachments = () => {
   const [attachments, setAttachments] = useState<AttachmentItem[]>([]);

   const attachmentsRef = useRef<AttachmentItem[]>([]);

   useEffect(() => {
      attachmentsRef.current = attachments;
   }, [attachments]);

   useEffect(() => {
      return () => {
         attachmentsRef.current.forEach((attachment) => {
            if (attachment.previewUrl) {
               URL.revokeObjectURL(attachment.previewUrl);
            }
         });
      };
   }, []);

   const updateAttachment = useCallback(
      (id: string, patch: Partial<AttachmentItem>) => {
         setAttachments((prev) =>
            prev.map((attachment) =>
               attachment.id === id
                  ? {
                       ...attachment,
                       ...patch,
                    }
                  : attachment
            )
         );
      },
      []
   );

   const loadAttachmentMetadata = useCallback(
      async (attachment: AttachmentItem) => {
         const { file, previewUrl } = attachment;

         if (file.type.startsWith('image/') && previewUrl) {
            const img = new Image();

            img.onload = () => {
               updateAttachment(attachment.id, {
                  width: img.naturalWidth,
                  height: img.naturalHeight,
               });
               img.onload = null;
            };

            img.src = previewUrl;

            return;
         }

         if (file.type.startsWith('video/') && previewUrl) {
            const video = document.createElement('video');

            video.preload = 'metadata';

            video.onloadedmetadata = () => {
               updateAttachment(attachment.id, {
                  width: video.videoWidth,
                  height: video.videoHeight,
                  duration: Math.round(video.duration * 1000),
               });
               video.src = '';
            };

            video.src = previewUrl;

            return;
         }

         if (file.type.startsWith('audio/')) {
            const audio = document.createElement('audio');

            audio.preload = 'metadata';

            const url = URL.createObjectURL(file);

            audio.onloadedmetadata = () => {
               updateAttachment(attachment.id, {
                  duration: Math.round(audio.duration * 1000),
               });

               URL.revokeObjectURL(url);
            };

            audio.onerror = () => {
               URL.revokeObjectURL(url);
            };

            audio.src = url;
         }
      },
      [updateAttachment]
   );

   const add = useCallback(
      (files: File[]) => {
         const current = attachmentsRef.current;

         const available = MAX_ATTACHMENTS - current.length;

         if (available <= 0) {
            toast.error(`Максимум ${MAX_ATTACHMENTS} файлов`);

            return [];
         }

         const created: AttachmentItem[] = [];

         for (const file of files.slice(0, available)) {
            const item = createAttachmentItem(file);

            if (item) {
               created.push(item);
            }
         }

         if (!created.length) {
            return [];
         }

         setAttachments((prev) => [...prev, ...created]);

         created.forEach((attachment) => {
            void loadAttachmentMetadata(attachment);
         });

         return created;
      },
      [loadAttachmentMetadata]
   );

   const remove = useCallback((id: string) => {
      setAttachments((prev) => {
         const item = prev.find((a) => a.id === id);

         item?.controller?.abort();

         if (item?.previewUrl) {
            URL.revokeObjectURL(item.previewUrl);
         }

         return prev.filter((a) => a.id !== id);
      });
   }, []);

   const clear = useCallback(() => {
      attachmentsRef.current.forEach((attachment) => {
         attachment.controller?.abort();
         if (attachment.previewUrl) {
            URL.revokeObjectURL(attachment.previewUrl);
         }
      });

      setAttachments([]);
   }, []);

   const readyAttachments = attachments.filter(
      (attachment) => attachment.status === 'uploaded'
   );

   const isUploading = attachments.some(
      (attachment) => attachment.status === 'uploading'
   );

   const hasFailed = attachments.some(
      (attachment) => attachment.status === 'failed'
   );

   return {
      attachments,

      add,
      remove,
      clear,

      updateAttachment,

      readyAttachments,

      isUploading,
      hasFailed,
   };
};
