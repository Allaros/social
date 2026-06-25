import React from 'react';
import { useParticipants } from '../hooks/useGetParticipants';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import { formatLastSeen } from '@/shared/utils/dating';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import { Ban } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import BanMemberDialog from './BanMemberDialog';
import Participant from './Participant';

const ChatParticipants = ({
   chatIdentifier,
   isOwner,
}: {
   chatIdentifier: string;
   isOwner: boolean;
}) => {
   const { participants, fetchNextPage, hasNextPage, isFetching } =
      useParticipants(chatIdentifier);

   return (
      <div>
         <div>
            {participants.map((participant) => (
               <Participant
                  key={participant.memberId}
                  participant={participant}
                  isOwner={isOwner}
               />
            ))}
         </div>
         <LoadMoreTrigger
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
         />
      </div>
   );
};

export default ChatParticipants;
