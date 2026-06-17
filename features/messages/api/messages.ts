import { api } from '@/shared/api/axios';
import {
   CreateMessagePayload,
   ForwardPayload,
   GetAttachmentUploadUrlPayload,
   GetMessagesParams,
} from '../types/messages.request';
import { AttachmentUploadUrlResponse } from '../types/messages.types';

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

   setReadMessages: async ({
      chatIdentifier,
      lastMessageId,
      messageIds,
   }: {
      chatIdentifier: string;
      messageIds: number[];
      lastMessageId: number;
   }) => {
      const { data } = await api.put(`chats/${chatIdentifier}/read`, {
         lastMessageId,
         messageIds,
      });

      return data;
   },

   deleteMessages: async (chatIdentifier: string, messageIds: number[]) => {
      const { data } = await api.post(
         `chats/${chatIdentifier}/messages/delete`,
         { messageIds }
      );
   },

   hideMessages: async (chatIdentifier: string, messageIds: number[]) => {
      const { data } = await api.post(`chats/${chatIdentifier}/messages/hide`, {
         messageIds,
      });
   },

   editMessage: async ({
      chatIdentifier,
      messageId,
      text,
   }: {
      chatIdentifier: string;
      messageId: number;
      text: string;
   }) => {
      const { data } = await api.put(
         `chats/${chatIdentifier}/messages/${messageId}`,
         { text }
      );

      return data;
   },

   forwardMessages: async ({
      chatIdentifier,
      forwardPayload,
   }: {
      chatIdentifier: string;
      forwardPayload: ForwardPayload[];
   }) => {
      const { data } = await api.post(
         `chats/${chatIdentifier}/messages/forward`,
         { forwardPayload }
      );
      return data;
   },
};
