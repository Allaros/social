import { Socket } from 'socket.io-client';
import { QueryClient } from '@tanstack/react-query';
import { WsNotificationEvents } from '@/shared/events/ws-events';
import { handleCreated } from './create.handler';
import { handleDeleted } from './delete.handler';
import { NotificationsStateType } from '../types/notifications.interface';
import { handleUpdated } from './update.handler';

export function registerNotificationListeners(
   socket: Socket,
   queryClient: QueryClient
) {
   const handleCreatedListener = (payload: NotificationsStateType) => {
      handleCreated(queryClient, payload);
   };

   const handleDeletedListener = (payload: NotificationsStateType) => {
      handleDeleted(queryClient, payload);
   };

   const handleUpdatedListener = (payload: NotificationsStateType) => {
      handleUpdated(queryClient, payload);
   };

   socket.on(WsNotificationEvents.CREATED, handleCreatedListener);
   socket.on(WsNotificationEvents.DELETED, handleDeletedListener);
   socket.on(WsNotificationEvents.UPDATED, handleUpdatedListener);

   return () => {
      socket.off(WsNotificationEvents.CREATED, handleCreatedListener);
      socket.off(WsNotificationEvents.DELETED, handleDeletedListener);
      socket.off(WsNotificationEvents.UPDATED, handleUpdatedListener);
   };
}
