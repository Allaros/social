import EmptyPage from '@/shared/components/EmptyPage';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import React from 'react';
import RelationsItem from './RelationsItem';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import RelationsAnimatedList from '@/features/framer-animations/components/AnimatedList/RelationsAnimatedList';

const RelationsFeed = ({
   relationsQuery,
}: {
   relationsQuery: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>;
}) => {
   const { data, fetchNextPage, hasNextPage, isFetching } = relationsQuery;

   const friends = data?.pages.flatMap((page) => page.data) ?? [];

   if (!data && friends.length === 0)
      return <EmptyPage preset="emptyRelations" />;
   return (
      <div className="py-2">
         <RelationsAnimatedList>
            {friends.map((friend) => (
               <RelationsItem friend={friend} key={friend.id} />
            ))}
         </RelationsAnimatedList>

         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         ></LoadMoreTrigger>
      </div>
   );
};

export default RelationsFeed;
