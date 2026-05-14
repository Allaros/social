import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket() {
   return socket;
}

export function connectSocket() {
   if (socket) {
      return socket;
   }

   socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
      withCredentials: true,
      reconnection: true,
   });

   return socket;
}

export function disconnectSocket() {
   socket?.disconnect();
   socket = null;
}
