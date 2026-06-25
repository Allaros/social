import { ProfileListItem } from '@/features/profile/types/profile.interface';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import Checkbox from '@/shared/components/Checkbox';
import { cn } from '@/shared/lib/utils';
import React from 'react';

const InviteItem = ({
   friend,
   checked,
   onToggle,
}: {
   friend: ProfileListItem;
   checked: boolean;
   onToggle: () => void;
}) => {
   return (
      <div
         onClick={onToggle}
         className="py-1 pr-4 pl-2 flex gap-8 items-center"
      >
         <div className="flex-1 flex items-center gap-4 px-2 py-1 hover:bg-neutralWhite-400 cursor-pointer rounded-sm">
            <AvatarComponent
               avatarUrl={friend.avatarUrl}
               isOnline={friend.isOnline}
               name={friend.name}
               className="size-12"
            />
            <div className="flex flex-1 flex-col flex-start">
               <div className={cn('flex flex-col items-start', '', '')}>
                  <p className="textBody">{friend.name}</p>
                  <p className="textLabel-medium text-neutralBlack-500">
                     @{friend.username}
                  </p>
               </div>
            </div>
            <Checkbox checked={checked} onChange={onToggle} />
         </div>
      </div>
   );
};

export default InviteItem;
