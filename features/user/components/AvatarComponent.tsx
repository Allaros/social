import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { getInitials } from '@/shared/utils/initials';
import React from 'react';

const AvatarComponent = ({
   avatarUrl,
   name,
   className,
}: {
   name?: string;
   avatarUrl?: string;
   className?: string;
}) => {
   return (
      <Avatar className={`w-full h-full ${className}`}>
         <AvatarImage src={avatarUrl} alt={`${name} avatar`} />
         <AvatarFallback>{getInitials(name ?? 'incognito')}</AvatarFallback>
      </Avatar>
   );
};

export default AvatarComponent;
