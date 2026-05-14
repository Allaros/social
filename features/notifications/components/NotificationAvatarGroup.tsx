import AvatarComponent from '@/features/user/components/AvatarComponent';
import { AvatarGroup, AvatarGroupCount } from '@/shared/components/ui/avatar';
import React from 'react';
import { NotificationActorType } from '../types/notifications.interface';

type Props = {
   actors: NotificationActorType[];
   totalCount?: number;
   maxVisible?: number;
};

const NotificationAvatarGroup = ({
   actors,
   maxVisible = 3,
   totalCount,
}: Props) => {
   if (!actors?.length) return null;

   const visible = actors.slice(0, maxVisible);

   if (actors.length === 1) {
      const actor = actors[0];

      return (
         <div className="size-10 md:size-12">
            <AvatarComponent avatarUrl={actor.avatarUrl} name={actor.name} />
         </div>
      );
   }

   return (
      <AvatarGroup className="-space-x-7 md:-space-x-8">
         {visible.map((actor, i) => (
            <AvatarComponent
               key={actor.id}
               avatarUrl={actor.avatarUrl}
               name={actor.name}
               className="size-10 md:size-12"
               z={visible.length - i}
            />
         ))}
      </AvatarGroup>
   );
};

export default NotificationAvatarGroup;
