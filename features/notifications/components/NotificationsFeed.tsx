'use client';

import React from 'react';
import { useGetNotifications } from '../hooks/useGetNotifications';
import EmptyPage from '@/shared/components/EmptyPage';
import NotificationItem from './NotificationItem';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import { FramedList } from '@/features/framer-animations/components/AnimatedList/FramedList';
import { FramedItem } from '@/features/framer-animations/components/AnimatedList/FramedItem';
import { useSeenNotifications } from '../hooks/useSeenNotifications';

const NotificationsFeed = () => {
   const { data, fetchNextPage, hasNextPage, isFetching } =
      useGetNotifications();

   const { observe } = useSeenNotifications();

   const notifications = data?.pages.flatMap((page) => page.items) ?? [];

   if (!data || notifications.length === 0)
      return <EmptyPage preset="emptyNotifications" />;
   return (
      <div className="py-4">
         <FramedList layoutMode="items" preset="notifications">
            {notifications.map((notification) => (
               <FramedItem key={notification.id} id={`${notification.id}`}>
                  {' '}
                  <NotificationItem
                     notification={notification}
                     observe={observe}
                  />
               </FramedItem>
            ))}
         </FramedList>

         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />
      </div>
   );
};

export default NotificationsFeed;
