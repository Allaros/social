import { QueryClient } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';
import {
   RealtimeMessageCreatedType,
   RealtimeMessageEditedType,
   RealtimeMessagesDeletedType,
   RealtimeMessagesReadType,
} from '../types/message-realtime.types';
import { WsMessageEvents } from '../../../shared/events/ws-events';
import { handleMessageCreated } from './message-created.handler';
import { handleMessagesDeleted } from './messages-deleted.handler';
import { handleMessagesRead } from './messages-read.handler';
import { handleMessageEdited } from './message-edited.handler';

export function registerChatListener(socket: Socket, queryClient: QueryClient) {
   const createdListener = (payload: RealtimeMessageCreatedType) => {
      handleMessageCreated(queryClient, payload);
   };

   const deletedListener = (payload: RealtimeMessagesDeletedType) => {
      handleMessagesDeleted(queryClient, payload);
   };

   const readListener = (payload: RealtimeMessagesReadType) => {
      handleMessagesRead(queryClient, payload);
   };

   const editListener = (payload: RealtimeMessageEditedType) => {
      handleMessageEdited(queryClient, payload);
   };

   socket.on(WsMessageEvents.REALTIME_MESSAGE_CREATED, createdListener);
   socket.on(WsMessageEvents.REALTIME_MESSAGE_DELETED, deletedListener);
   socket.on(WsMessageEvents.REALTIME_MESSAGE_READ, readListener);
   socket.on(WsMessageEvents.REALTIME_MESSAGE_EDITED, editListener);

   return () => {
      socket.off(WsMessageEvents.REALTIME_MESSAGE_CREATED, createdListener);
      socket.off(WsMessageEvents.REALTIME_MESSAGE_DELETED, deletedListener);
      socket.off(WsMessageEvents.REALTIME_MESSAGE_READ, readListener);
      socket.off(WsMessageEvents.REALTIME_MESSAGE_EDITED, editListener);
   };
}
