import { MessageAttachment } from '@/features/messages/types/messages.types';
import Image from 'next/image';
import React from 'react';

const MediaAttachment = ({ media }: { media: MessageAttachment }) => {
   return (
      <div className="max-w-[320px] overflow-hidden rounded-sm">
         {media.mimeType.startsWith('image') ? (
            <Image
               src={media.url!}
               alt="message attachment"
               width={media.width ?? 300}
               height={media.height ?? 300}
               className="h-auto w-full object-cover"
            />
         ) : (
            <video src={media.url!}></video>
         )}
      </div>
   );
};

export default MediaAttachment;
