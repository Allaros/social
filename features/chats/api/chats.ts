import { api } from '@/shared/api/axios';
import {
   CreateChannelPayload,
   CreateDirectChatPayload,
   CreateGroupChatPayload,
   GetMyChatsParams,
} from '../types/chats.request';

export const chatsApi = {
   getMyChats: async (params?: GetMyChatsParams) => {
      const { data } = await api.get('chats', { params });
      return data;
   },

   getActiveChat: async (identifier?: string | null) => {
      const { data } = await api.get(`chats/${identifier}`);
      return data;
   },

   createDirectChat: async (payload: CreateDirectChatPayload) => {
      const { data } = await api.post('chats/direct', payload);
      return data;
   },

   createGroupChat: async (payload: CreateGroupChatPayload) => {
      const { data } = await api.post('chats/group', payload);
      return data;
   },

   createChannel: async (payload: CreateChannelPayload) => {
      const { data } = await api.post('chats/channel', payload);
      return data;
   },

   leaveChat: async (chatIdentifier: string) => {
      const { data } = await api.post(`chats/${chatIdentifier}/leave`);

      return data;
   },

   rejoinChat: async (chatIdentifier: string) => {
      const { data } = await api.post(`chats/${chatIdentifier}/rejoin`);

      return data;
   },

   addMember: async ({
      chatIdentifier,
      targetProfileId,
   }: {
      chatIdentifier: string;
      targetProfileId: number;
   }) => {
      const { data } = await api.post(`chats/${chatIdentifier}/members`, {
         targetProfileId,
      });

      return data;
   },

   getMembersToAdd: async ({
      chatIdentifier,
      cursor,
      query,
   }: {
      chatIdentifier: string;
      cursor?: string;
      query?: string;
   }) => {
      const { data } = await api.get(`chats/${chatIdentifier}/members-to-add`, {
         params: {
            cursor,
            query,
         },
      });

      return data;
   },

   kickMember: async ({
      chatIdentifier,
      targetProfileId,
      restrictedUntil,
   }: {
      chatIdentifier: string;
      targetProfileId: number;
      restrictedUntil: string | null;
   }) => {
      const { data } = await api.post(`chats/${chatIdentifier}/kick`, {
         targetProfileId,
         restrictedUntil,
      });

      return data;
   },

   unbanMember: async ({
      chatIdentifier,
      targetProfileId,
   }: {
      chatIdentifier: string;
      targetProfileId: number;
   }) => {
      const { data } = await api.post(`chats/${chatIdentifier}/unban`, {
         targetProfileId,
      });

      return data;
   },

   deleteDirect: async (chatIdentifier: string) => {
      const { data } = await api.delete(
         `chats/${chatIdentifier}/delete/direct`
      );

      return data;
   },

   deleteGroup: async (chatIdentifier: string) => {
      const { data } = await api.delete(`chats/${chatIdentifier}/delete/group`);

      return data;
   },

   toggleMute: async (chatIdentifier: string) => {
      const { data } = await api.put(`chats/${chatIdentifier}/toggle-mute`);
      return data;
   },

   getChatAvatarUploadUrl: async (mimeType: string) => {
      const { data } = await api.get(
         `chats/avatar-upload-url?mimeType=${mimeType}`
      );
      return data;
   },

   async getParticipants(
      chatIdentifier: string,
      params?: {
         cursor?: string | null;
         limit?: number;
      }
   ) {
      const response = await api.get(`/chats/${chatIdentifier}/members`, {
         params,
      });

      return response.data;
   },
};
