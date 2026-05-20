import { ProfileListItem } from '@/features/profile/types/profile.interface';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import SendIco from '@/public/icons/Send.svg';
import ROUTES from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { formatLastSeen } from '@/shared/utils/dating';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RelationStartChatButton from './RelationStartChatButton';

const RelationsItem = ({ friend }: { friend: ProfileListItem }) => {
   return (
      <div className="py-1 pr-4 pl-2 flex gap-8 items-center">
         <Link
            href={ROUTES.main.profile(friend.username)}
            className="flex-1 flex items-center gap-4 px-2 py-1 hover:bg-neutralWhite-400 cursor-pointer rounded-sm"
         >
            <AvatarComponent
               avatarUrl={friend.avatarUrl}
               isOnline={friend.isOnline}
               name={friend.name}
               className="size-12"
            />
            <div className="flex flex-col flex-start">
               <div className={cn('flex items-center gap-2', '', '')}>
                  <p className="textBody">{friend.name}</p>
                  <p className="textLabel-medium text-neutralBlack-500">
                     @{friend.username}
                  </p>
               </div>
               <p className="textLabel text-neutralBlack-500">
                  {formatLastSeen({
                     isOnline: friend.isOnline,
                     lastSeenAt: friend.lastSeenAt,
                  })}
               </p>
            </div>
         </Link>
         <RelationStartChatButton receiverId={friend.id} />
      </div>
   );
};

export default RelationsItem;
