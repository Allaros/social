import { api } from '@/shared/api/axios';
import {
   AttachmentUploadUrlResponse,
   CreateMessagePayload,
   GetAttachmentUploadUrlPayload,
   GetMessagesParams,
} from '../types/messages.types';

export const messagesApi = {
   getMessages: async (chatIdentifier: string, params?: GetMessagesParams) => {
      const { data } = await api.get(`chats/${chatIdentifier}/messages`, {
         params,
      });
      return data;
   },

   createMessage: async (
      chatIdentifier: string,
      payload: CreateMessagePayload
   ) => {
      const { data } = await api.post(
         `chats/${chatIdentifier}/messages`,
         payload
      );
      return data;
   },

   getAttachmentUploadUrl: async (
      chatIdentifier: string,
      payload: GetAttachmentUploadUrlPayload
   ): Promise<AttachmentUploadUrlResponse> => {
      const { data } = await api.post(
         `chats/${chatIdentifier}/attachments/upload-url`,
         payload
      );
      return data;
   },

   uploadAttachment: async (signedUrl: string, file: File) => {
      await fetch(signedUrl, {
         method: 'PUT',
         body: file,
         headers: {
            'Content-Type': file.type,
         },
      });
   },
};
