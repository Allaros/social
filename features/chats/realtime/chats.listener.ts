import { QueryClient } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';
import {
   ChatListItem,
   ChatStateUpdatedType,
   UnreadChatsStateChangedType,
} from '../types/chats.types';
import { handleUnreadStateChanged } from './unread-state-change.handler';
import { WsChatEvents } from '@/shared/events/ws-events';
import { handleChatStateUpdated } from './chat-state-update.handler';
import { handleChatCreated } from './chat-create.handler';
import { handleChatDeleted } from './сhat-delete.handler';

export function registerChatsListener(
   socket: Socket,
   queryClient: QueryClient
) {
   const unreadStateChangedListener = (
      payload: UnreadChatsStateChangedType
   ) => {
      handleUnreadStateChanged(queryClient, payload);
   };

   const chatStateChangedListener = (payload: ChatStateUpdatedType) => {
      handleChatStateUpdated(queryClient, payload);
   };

   const chatInitializedListener = (chat: ChatListItem) => {
      handleChatCreated(queryClient, chat);
   };

   const chatDeletedListener = (payload: { chatId: number }) => {
      handleChatDeleted(queryClient, payload);
   };

   socket.on(WsChatEvents.UNREAD_STATE_CHANGED, unreadStateChangedListener);
   socket.on(WsChatEvents.CHAT_STATE_UPDATED, chatStateChangedListener);
   socket.on(WsChatEvents.CHAT_CREATED, chatInitializedListener);
   socket.on(WsChatEvents.CHAT_DELETED, chatDeletedListener);

   return () => {
      socket.off(WsChatEvents.UNREAD_STATE_CHANGED, unreadStateChangedListener);
      socket.off(WsChatEvents.CHAT_STATE_UPDATED, chatStateChangedListener);
      socket.off(WsChatEvents.CHAT_CREATED, chatInitializedListener);
      socket.off(WsChatEvents.CHAT_DELETED, chatDeletedListener);
   };
}
