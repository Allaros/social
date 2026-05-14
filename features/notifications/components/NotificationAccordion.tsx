'use client';

import { AnimatePresence, motion } from 'framer-motion';
import NotificationItem from './NotificationItem';
import {
   NotificationActorType,
   NotificationType,
} from '../types/notifications.interface';

const NotificationAccordion = ({
   expanded,
   actors,
   type,
}: {
   expanded: boolean;
   actors: NotificationActorType[];
   type: NotificationType;
}) => {
   if (actors.length <= 1) return null;

   return (
      <AnimatePresence initial={false}>
         {expanded && (
            <motion.div
               key="accordion"
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="overflow-hidden"
            >
               <div className="flex flex-col mt-2">
                  {actors.map((actor) => (
                     <NotificationItem
                        key={actor.id}
                        notification={{
                           id: actor.id,
                           type,
                           actor,
                           createdAt: actor.createdAt,
                           isRead: true,
                           isSeen: true,
                           aggregated: undefined,
                           aggregationType: 'count',
                        }}
                        mode="detailed"
                     />
                  ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default NotificationAccordion;
