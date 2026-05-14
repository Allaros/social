'use client';

import { createContext, useEffect } from 'react';
import { connectSocket, disconnectSocket } from '../lib/socket';
import { registerWebSocketListeners } from '../listeners/websocket.listener';
import { registerNotificationListeners } from '@/features/notifications/realtime/notifications.listener';
import { useQueryClient } from '@tanstack/react-query';
import { registerProfileListener } from '@/features/profile/realtime/profile.listener';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const queryClient = useQueryClient();
   useEffect(() => {
      const socket = connectSocket();

      const cleanupSocketListeners = registerWebSocketListeners(socket);

      const cleanupNotificationListeners = registerNotificationListeners(
         socket,
         queryClient
      );

      const cleanupProfileListeners = registerProfileListener(
         socket,
         queryClient
      );

      return () => {
         cleanupSocketListeners();
         cleanupNotificationListeners();
         cleanupProfileListeners();

         disconnectSocket();
      };
   }, [queryClient]);

   return children;
};
