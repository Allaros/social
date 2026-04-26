import { Skeleton } from '@/shared/components/ui/skeleton';
import React from 'react';

const CommentPlaceholder = () => {
   return (
      <div className="bg-neutralWhite-300 rounded-sm py-4 px-6">
         <div className="flex gap-4 items-center mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1.5">
               <Skeleton className="h-4 w-30"></Skeleton>
               <Skeleton className="h-3 w-30"></Skeleton>
            </div>
         </div>
         <div className="flex flex-col gap-2 mb-2">
            <Skeleton className="w-full h-3"></Skeleton>
            <Skeleton className="w-[80%] h-3"></Skeleton>
         </div>
         <div className="text-right textLabel-medium text-neutralBlack-800">
            Ответить
         </div>
      </div>
   );
};

export default CommentPlaceholder;
