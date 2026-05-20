import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';

import { WsPresenceEvents } from '@/shared/events/ws-events';
import { friendsKeys } from '@/shared/lib/query-keys';

type PresencePayload = {
   profileId: number;
   isOnline: boolean;
};

type RelationsPage = {
   data: any[];
   nextCursor: string | null;
};

export function registerRelationsPresenceListener(
   socket: Socket,
   queryClient: QueryClient
) {
   const handlePresenceChanged = ({ profileId, isOnline }: PresencePayload) => {
      console.log('RELATIONS_LISTENER_ACTIVATED', profileId);
      queryClient.setQueriesData(
         {
            queryKey: friendsKeys.all,
         },
         (old: InfiniteData<RelationsPage> | undefined) => {
            if (!old) return old;

            return {
               ...old,

               pages: old.pages.map((page) => ({
                  ...page,

                  data: page.data.map((profile) => {
                     if (profile.id !== profileId) {
                        return profile;
                     }

                     return {
                        ...profile,
                        isOnline,
                        lastSeenAt: Date.now(),
                     };
                  }),
               })),
            };
         }
      );
   };

   socket.on(WsPresenceEvents.ONLINE_STATE_CHANGED, handlePresenceChanged);

   return () => {
      socket.off(WsPresenceEvents.ONLINE_STATE_CHANGED, handlePresenceChanged);
   };
}
