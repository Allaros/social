import SuggestedFriendsCard from '@/features/friends/components/cards/SuggestedFriendsCard';
import NotificationsFeed from '@/features/notifications/components/NotificationsFeed';
import { cn } from '@/shared/lib/utils';
import React from 'react';

const NotificationsPage = () => {
   return (
      <section
         className={cn(
            'grid items-start gap-8',
            'grid-cols-1',
            'lg:grid-cols-[6fr_3fr]'
         )}
      >
         <div className="card ">
            <div className="border-b border-neutralWhite-400">
               <p
                  className={cn(
                     'font-medium',
                     'py-3 px-4',
                     'md:text-[16px] md:py-6 md:px-8'
                  )}
               >
                  Уведомления
               </p>
            </div>
            <NotificationsFeed />
         </div>
         <SuggestedFriendsCard></SuggestedFriendsCard>
      </section>
   );
};

export default NotificationsPage;
