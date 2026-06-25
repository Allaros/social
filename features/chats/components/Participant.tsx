import AvatarComponent from '@/features/user/components/AvatarComponent';
import ROUTES from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { formatLastSeen, formatRestrictedUntil } from '@/shared/utils/dating';
import { Ban, UserPlus } from 'lucide-react';
import React from 'react';
import BanMemberDialog from './BanMemberDialog';
import { ChatParticipant } from '../types/chats.types';
import Link from 'next/link';
import UnbanMemberDialog from './UnbanMemberDialog';

const Participant = ({
   participant,
   isOwner,
}: {
   participant: ChatParticipant;
   isOwner: boolean;
}) => {
   return (
      <div
         className={cn(
            'flex items-center gap-2',
            participant.isSelf ? 'bg-neutralWhite-500' : 'bg-neutralWhite-100'
         )}
         key={participant.memberId}
      >
         <Link
            href={ROUTES.main.profile(participant.username)}
            className="flex items-center gap-4 p-1.5 rounded-sm flex-1 hover:bg-primary-100 transition-colors duration-200"
         >
            <div>
               <AvatarComponent
                  avatarUrl={participant.avatarUrl}
                  name={participant.name}
                  isOnline={participant.isOnline}
                  className="size-10"
               />
            </div>
            <div>
               <p className="h6">
                  {participant.name ?? participant.username}{' '}
                  {participant.role === 'owner' && (
                     <span className="textLabel text-success-500">
                        Владелец
                     </span>
                  )}
               </p>
               <p
                  className={cn(
                     'textLabel ',
                     participant.restrictedUntil
                        ? 'text-danger-500'
                        : 'text-neutralBlack-500'
                  )}
               >
                  {participant.restrictedUntil
                     ? formatRestrictedUntil({
                          restrictedUntil: participant.restrictedUntil,
                       })
                     : formatLastSeen({
                          isOnline: participant.isOnline,
                          lastSeenAt: participant.lastSeenAt,
                       })}
               </p>
            </div>
         </Link>
         {isOwner && !participant.isSelf && (
            <div>
               <BanMemberDialog targetId={participant.memberProfileId}>
                  {!participant.restrictedUntil && (
                     <button className="flex items-center justify-center text-neutralWhite-100 bg-danger-600 rounded-sm p-1.5 hover:bg-danger-400 transition-colors duration-300 cursor-pointer">
                        <Ban size={20} />
                     </button>
                  )}
               </BanMemberDialog>
               <UnbanMemberDialog targetId={participant.memberProfileId}>
                  {!!participant.restrictedUntil && (
                     <button className="flex items-center justify-center text-neutralWhite-100 bg-primary-900 rounded-sm p-1.5 hover:bg-primary-800 transition-colors duration-300 cursor-pointer">
                        <UserPlus size={20} />
                     </button>
                  )}
               </UnbanMemberDialog>
            </div>
         )}
      </div>
   );
};

export default Participant;
