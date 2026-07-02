import { QueryClient } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';

import { WsPresenceEvents } from '@/shared/events/ws-events';
import { profileKeys, searchKeys } from '@/shared/lib/query-keys';

type PresencePayload = {
   profileId: number;
   isOnline: boolean;
};

export function registerProfileListener(
   socket: Socket,
   queryClient: QueryClient
) {
   const handlePresenceChanged = ({ profileId, isOnline }: PresencePayload) => {
      queryClient.setQueriesData(
         {
            queryKey: profileKeys.all,
         },
         (old: any) => {
            if (!old) return old;

            if (old.id !== profileId) {
               return old;
            }

            return {
               ...old,
               isOnline,
            };
         }
      );

      queryClient.setQueriesData(
         {
            queryKey: searchKeys.all,
         },
         (old: any) => {
            if (!old?.data) return old;

            return {
               ...old,
               data: old.data.map((profile: any) => {
                  if (profile.id !== profileId) {
                     return profile;
                  }

                  return {
                     ...profile,
                     isOnline,
                  };
               }),
            };
         }
      );
   };

   socket.on(WsPresenceEvents.ONLINE_STATE_CHANGED, handlePresenceChanged);

   return () => {
      socket.off(WsPresenceEvents.ONLINE_STATE_CHANGED, handlePresenceChanged);
   };
}
