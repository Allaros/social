'use client';

import { MessageAttachment } from '@/features/messages/types/messages.types';
import { Skeleton } from '@/shared/components/ui/skeleton';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
   media: MessageAttachment;
   onClick: () => void;
   preserveAspectRatio?: boolean;
};

const MediaAttachment = ({
   media,
   onClick,
   preserveAspectRatio = false,
}: Props) => {
   const [loaded, setLoaded] = useState(false);

   return (
      <div
         className={`relative w-full h-full overflow-hidden ${
            preserveAspectRatio ? '' : 'aspect-square'
         }`}
      >
         {!loaded && <Skeleton className="absolute inset-0 z-10 rounded-md" />}

         {media.mimeType.startsWith('image') ? (
            <Image
               src={media.url!}
               alt=""
               fill
               sizes="320px"
               onClick={onClick}
               onLoad={() => setLoaded(true)}
               onError={() => setLoaded(true)}
               className="cursor-pointer object-cover  rounded-sm transition-transform duration-300 hover:scale-[1.02]"
            />
         ) : (
            <video
               src={media.url!}
               onClick={onClick}
               onLoadedData={() => setLoaded(true)}
               onError={() => setLoaded(true)}
               className="absolute inset-0 h-full rounded-sm w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
         )}
      </div>
   );
};

export default MediaAttachment;
