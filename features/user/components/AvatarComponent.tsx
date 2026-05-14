import {
   Avatar,
   AvatarBadge,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { getInitials } from '@/shared/utils/initials';
import React from 'react';

const AvatarComponent = ({
   avatarUrl,
   name,
   isOnline,
   className,
   z,
}: {
   name?: string;
   isOnline?: boolean;
   avatarUrl?: string;
   className?: string;
   z?: number;
}) => {
   return (
      <Avatar style={{ zIndex: z }} className={`w-full h-full  ${className}`}>
         <AvatarImage
            className="rounded-full"
            src={avatarUrl}
            alt={`${name} avatar`}
         />
         <AvatarFallback className=" text-neutralWhite-100 bg-linear-to-br from-primary-900 via-primary-700 to-primary-400">
            {getInitials(name ?? 'incognito')}
         </AvatarFallback>
         <AvatarBadge
            className={`
      h-[20%]!
      w-[20%]!
      ${isOnline ? 'bg-success-900 opacity-100' : 'opacity-0'}
      transition
   `}
         ></AvatarBadge>
      </Avatar>
   );
};

export default AvatarComponent;
