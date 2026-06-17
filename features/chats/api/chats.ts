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

   getActiveChat: async (identifier?: string) => {
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
};
