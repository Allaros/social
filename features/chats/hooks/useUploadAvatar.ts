import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { uploadChatAvatar } from '../utils/upload-avatar';

export type AvatarStatus = 'idle' | 'uploading' | 'uploaded' | 'failed';

export type AvatarUpload = {
   file: File | null;
   previewUrl: string | null;
   status: AvatarStatus;
   progress: number;

   uploadedMetadata?: {
      storageKey: string;
      mimeType: string;
      size: number;
   };

   error?: string;

   controller?: AbortController;
};

const MAX_SIZE_MB = 10;

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const useAvatarUpload = () => {
   const [avatar, setAvatar] = useState<AvatarUpload>({
      file: null,
      previewUrl: null,
      status: 'idle',
      progress: 0,
   });

   useEffect(() => {
      return () => {
         if (avatar.previewUrl) {
            URL.revokeObjectURL(avatar.previewUrl);
         }
      };
   }, [avatar.previewUrl]);

   const upload = useCallback(async (file: File) => {
      const normalizedMimeType = file.type.split(';')[0];

      if (!ALLOWED_MIME_TYPES.includes(normalizedMimeType)) {
         toast.error(`Тип файла не поддерживается: ${normalizedMimeType}`);
         return null;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
         toast.error(`Файл слишком большой (максимум ${MAX_SIZE_MB}MB)`);
         return null;
      }

      const previewUrl = URL.createObjectURL(file);

      const controller = new AbortController();

      setAvatar((prev) => {
         if (prev.previewUrl) {
            URL.revokeObjectURL(prev.previewUrl);
         }

         return {
            file,
            previewUrl,
            status: 'uploading',
            progress: 0,
            controller,
         };
      });

      try {
         const uploaded = await uploadChatAvatar(file, {
            signal: controller.signal,

            onProgress: (progress) => {
               setAvatar((prev) => ({
                  ...prev,
                  progress,
               }));
            },
         });

         setAvatar((prev) => ({
            ...prev,
            status: 'uploaded',
            progress: 100,
            uploadedMetadata: uploaded,
            controller: undefined,
         }));

         return uploaded;
      } catch (error) {
         const message =
            error instanceof Error
               ? error.message
               : 'Не удалось загрузить аватар';

         setAvatar((prev) => ({
            ...prev,
            status: 'failed',
            error: message,
            controller: undefined,
         }));

         toast.error(message);

         return null;
      }
   }, []);

   const clear = useCallback(() => {
      setAvatar((prev) => {
         prev.controller?.abort();

         if (prev.previewUrl) {
            URL.revokeObjectURL(prev.previewUrl);
         }

         return {
            file: null,
            previewUrl: null,
            status: 'idle',
            progress: 0,
         };
      });
   }, []);

   return {
      avatar,
      upload,
      clear,

      isUploading: avatar.status === 'uploading',

      isUploaded: avatar.status === 'uploaded',
   };
};
