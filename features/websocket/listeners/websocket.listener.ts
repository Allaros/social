import { Socket } from 'socket.io-client';

export const registerWebSocketListeners = (socket: Socket) => {
   const handleConnect = () => {
      console.log('CONNECTED', socket.id);
   };

   const handleDisconnect = (reason: string) => {
      console.log('DISCONNECTED', reason);
   };

   const handleConnectError = (err: Error) => {
      console.log('CONNECT ERROR', err);
   };

   socket.on('connect', handleConnect);
   socket.on('disconnect', handleDisconnect);
   socket.on('connect_error', handleConnectError);

   return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
   };
};
