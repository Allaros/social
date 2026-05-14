import React, { useState } from 'react';
import { NotificationResponse } from '../types/notifications.interface';
import { cn } from '@/shared/lib/utils';
import { formatPostDate } from '@/shared/utils/dating';
import NotificationAvatarGroup from './NotificationAvatarGroup';
import NotificationText from './NotificationText';
import { ChevronDown, X } from 'lucide-react';
import { useDeleteNotification } from '../hooks/useDeleteNotification';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import ROUTES from '@/shared/constants/routes';
import NotificationAccordion from './NotificationAccordion';
import { useSeenNotifications } from '../hooks/useSeenNotifications';

const NotificationItem = ({
   notification,
   mode = 'default',
   observe,
}: {
   notification: NotificationResponse;
   mode?: 'default' | 'detailed';
   observe?: (el: HTMLElement | null, id: number, isSeen: boolean) => void;
}) => {
   const { mutate: deleteNotification, isPending } = useDeleteNotification();
   const [expanded, setExpanded] = useState(false);
   const router = useRouter();

   const isMobile = useIsMobile();

   const isAggregated =
      !!notification.aggregated && notification.aggregated.count > 1;

   const actors =
      notification.aggregated && notification.aggregated.count > 1
         ? notification.aggregated?.actors
         : [notification.actor];

   const handleNotificationClick = (expanded: boolean, username?: string) => {
      if (mode === 'default') {
         setExpanded(!expanded);
      } else if (username && mode === 'detailed') {
         router.push(ROUTES.main.profile(username));
      }
   };

   return (
      <div
         ref={(el) =>
            observe && observe(el, notification.id, notification.isSeen)
         }
         className={`not-last:border-b border-neutralWhite-400 ${notification.isSeen ? '' : 'bg-neutralWhite-500'}`}
      >
         <div
            className={cn(
               'flex items-center hover:bg-neutralWhite-300 transition-colors duration-300 relative py-4 ',
               'px-2 gap-2',
               'md:px-4 md:gap-4'
            )}
         >
            <div
               onClick={() =>
                  handleNotificationClick(expanded, notification.actor.username)
               }
               className="flex items-center gap-4 flex-1 cursor-pointer"
            >
               <div className="">
                  <NotificationAvatarGroup
                     actors={actors}
                     totalCount={notification.aggregated?.count}
                  />
               </div>
               <div className="textBody text-neutralBlack-600 flex-1">
                  <NotificationText
                     actors={actors}
                     type={notification.type}
                     aggregatedCount={notification.aggregated?.count}
                     aggregationType={
                        isMobile ? 'count' : notification.aggregationType
                     }
                     textPreview={notification.textPreview}
                  />
                  <div>
                     <span className="textLabel text-neutralBlack-500">
                        {formatPostDate(notification.createdAt)}
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               {isAggregated && mode === 'default' && (
                  <button
                     onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                     }}
                  >
                     <ChevronDown
                        className={`size-5 transition-transform duration-300 ${expanded ? 'rotate-x-180' : 'rotate-x-0'}`}
                     ></ChevronDown>
                  </button>
               )}
               {mode === 'default' && (
                  <button
                     onClick={() =>
                        deleteNotification({ notificationId: notification.id })
                     }
                     className="cursor-pointer"
                  >
                     <X className="size-5 text-neutralBlack-500"></X>
                  </button>
               )}
            </div>
         </div>
         <NotificationAccordion
            actors={actors}
            expanded={expanded}
            type={notification.type}
         ></NotificationAccordion>
      </div>
   );
};

export default NotificationItem;
