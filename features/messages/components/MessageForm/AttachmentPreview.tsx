import React from 'react';
import Image from 'next/image';
import { X, RefreshCcw } from 'lucide-react';

import { AttachmentItem } from '../../hooks/queries/useAttachments';
import { getFileIcon } from '../../utils/get-file-icons';

import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { useIsMobile } from '@/shared/hooks/useIsMobile';

export const formatFileSize = (bytes: number) => {
   if (bytes === 0) return '0 B';

   const units = ['B', 'KB', 'MB', 'GB'];

   const index = Math.floor(Math.log(bytes) / Math.log(1024));

   const value = bytes / Math.pow(1024, index);

   return `${value.toFixed(
      value >= 10 || index === 0 ? 0 : 1
   )} ${units[index]}`;
};

const AttachmentPreview = ({
   attachment,
   onRemove,
   onRetry,
}: {
   attachment: AttachmentItem;
   onRemove: (id: string) => void;
   onRetry: (id: string) => void;
}) => {
   const isMobile = useIsMobile();

   const Icon = getFileIcon(attachment.mimeType);

   const fileName = attachment.file.name;

   const fileBaseName = fileName.replace(/\.[^/.]+$/, '');

   const sizeLabel = attachment.error
      ? 'Ошибка'
      : attachment.status === 'uploading'
        ? `${formatFileSize(
             (attachment.file.size * attachment.progress) / 100
          )} из ${formatFileSize(attachment.file.size)}`
        : formatFileSize(attachment.file.size);

   const preview = (
      <div className="relative size-25 rounded-sm overflow-hidden card">
         {attachment.mimeType.startsWith('image') ||
         attachment.mimeType.startsWith('video') ? (
            <Image
               src={attachment.previewUrl!}
               alt={fileName}
               width={100}
               height={100}
               className="absolute inset-0 size-full object-cover z-1"
            />
         ) : (
            <div className="absolute inset-0 size-full z-1 text-neutralBlack-600 py-2 px-2">
               <Icon size={28} />
            </div>
         )}

         <button
            type="button"
            onClick={() => onRemove(attachment.id)}
            className="absolute top-1 right-1.5 z-3 text-neutralWhite-100 rounded-sm p-px bg-neutralBlack-800/60 hover:bg-neutralBlack-800 transition-colors cursor-pointer"
         >
            <X size={16} />
         </button>

         <div className="absolute bottom-0 left-0 w-full h-1/2 gradientBgBlack z-2 text-neutralWhite-100 textLabel px-2 py-1 flex flex-col justify-end">
            {isMobile && <p className="truncate">{fileBaseName}</p>}

            <p className="truncate flex items-center gap-2">
               {sizeLabel}{' '}
               {attachment.status === 'failed' && (
                  <button type="button" onClick={() => onRetry(attachment.id)}>
                     <RefreshCcw size={18} />
                  </button>
               )}
            </p>
         </div>
      </div>
   );

   if (isMobile) {
      return preview;
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>{preview}</TooltipTrigger>

         <TooltipContent>{fileName}</TooltipContent>
      </Tooltip>
   );
};

export default AttachmentPreview;
