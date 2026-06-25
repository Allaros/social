import { uploadFiles } from '@/shared/handlers/uploadFiles';
import { chatsApi } from '../api/chats';

export type UploadChatAvatarResult = {
   storageKey: string;
   mimeType: string;
   size: number;
};

type UploadChatAvatarOptions = {
   signal?: AbortSignal;

   onProgress?: (progress: number) => void;
};

export const uploadChatAvatar = async (
   file: File,
   options: UploadChatAvatarOptions = {}
): Promise<UploadChatAvatarResult> => {
   const { signedUrl, storageKey } = await chatsApi.getChatAvatarUploadUrl(
      file.type
   );

   const [uploaded] = await uploadFiles({
      files: [
         {
            file,
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
