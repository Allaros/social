import { useEffect } from 'react';
import { getSocket } from '../lib/socket';

export function useChatRealtimeConnection(chatId?: number, enabled = true) {
   useEffect(() => {
      const socket = getSocket();

      if (!socket || !chatId || !enabled) {
         return;
      }

      const join = () => {
         socket.emit('chat:join', {
            chatId,
         });
      };

      join();

      socket.on('connect', join);

      return () => {
         socket.off('connect', join);

         socket.emit('chat:leave', {
            chatId,
         });
      };
   }, [chatId, enabled]);
}
