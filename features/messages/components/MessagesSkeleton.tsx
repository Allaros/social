import { Skeleton } from '@/shared/components/ui/skeleton';
import React from 'react';

const MessagesSkeleton = () => {
   return (
      <div className="flex flex-col justify-end gap-4 h-full py-4">
         <div className="flex gap-2 items-start self-start">
            <Skeleton className="rounded-full size-10" />
            <Skeleton className="w-80 max-md:w-50 h-14" />
         </div>
         <div className="flex gap-2 items-start self-end">
            <Skeleton className="w-80 max-md:w-50 h-30" />
            <Skeleton className="rounded-full size-10" />
         </div>

         <div className="flex gap-2 items-start self-start">
            <Skeleton className="rounded-full size-10" />
            <Skeleton className="w-80 max-md:w-50 h-15" />
         </div>
         <div className="flex gap-2 items-start self-start">
            <Skeleton className="rounded-full size-10" />
            <Skeleton className="w-60 max-md:w-35 h-10" />
         </div>
         <div className="flex gap-2 items-start self-end">
            <Skeleton className="w-80 max-md:w-50 h-20" />
            <Skeleton className="rounded-full size-10" />
         </div>
      </div>
   );
};

export default MessagesSkeleton;
