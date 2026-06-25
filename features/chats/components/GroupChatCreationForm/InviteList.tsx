import RelationsAnimatedList from '@/features/framer-animations/components/AnimatedList/RelationsAnimatedList';
import RelationsItem from '@/features/friends/components/RelationsItem';
import { useRelations } from '@/features/friends/hooks/useGetRelations';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import React from 'react';
import InviteItem from './InviteItem';

const InviteList = ({
   onToggle,
   selectedIds,
}: {
   selectedIds: number[];
   onToggle: (profileId: number) => void;
}) => {
   const { data, fetchNextPage, hasNextPage, isFetching } = useRelations({
      type: 'friends',
   });

   const friends = data?.pages.flatMap((page) => page.data) ?? [];
   return (
      <div className="mt-8 max-h-150 overflow-y-auto">
         <div className="py-2">Пригласить друзей</div>
         <RelationsAnimatedList>
            {friends.map((friend) => (
               <InviteItem
                  checked={selectedIds.includes(friend.id)}
                  onToggle={() => onToggle(friend.id)}
                  friend={friend}
                  key={friend.id}
               />
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

export default InviteList;
