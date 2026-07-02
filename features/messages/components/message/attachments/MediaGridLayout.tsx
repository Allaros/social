import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import { MessageAttachment } from '@/features/messages/types/messages.types';
import {
   MediaGridMapping,
   RowConfig,
} from '@/features/post/constants/MediaGridMapping';
import MediaAttachment from './MediaAttachment';

const colsClassMap: Record<number, string> = {
   1: 'grid-cols-1',
   2: 'grid-cols-2',
   3: 'grid-cols-3',
   4: 'grid-cols-4',
};

const MediaGridLayout = ({ media }: { media: MessageAttachment[] }) => {
   const { openModal } = useModal();

   const normalized = media.map((item) => ({
      src: item.url!,
      type: item.mimeType,
   }));

   if (media.length === 1) {
      return (
         <div
            className="overflow-hidden rounded-md w-full"
            style={{
               aspectRatio: `${media[0].width}/${media[0].height}`,
            }}
         >
            <MediaAttachment
               media={media[0]}
               preserveAspectRatio
               onClick={() =>
                  openModal(MODALS.PREVIEW, {
                     index: 0,
                     items: normalized,
                  })
               }
            />
         </div>
      );
   }

   const layout =
      MediaGridMapping[Math.min(media.length, MediaGridMapping.length) - 1];

   let cursor = 0;

   const renderRow = (row?: RowConfig) => {
      if (!row) return null;
      const startIndex = cursor;
      const items = media.slice(cursor, cursor + row.count);
      cursor += row.count;

      if (!items.length) return null;

      return (
         <div
            key={startIndex}
            className={` grid gap-1 ${colsClassMap[row.cols]} w-full`}
         >
            {items.map((item, i) => {
               return (
                  <MediaAttachment
                     key={item.id}
                     media={item}
                     onClick={() =>
                        openModal(MODALS.PREVIEW, {
                           index: startIndex + i,
                           items: normalized,
                        })
                     }
                  />
               );
            })}
         </div>
      );
   };

   return (
      <div className="flex flex-col gap-1">
         {renderRow(layout.top)}
         {renderRow(layout.middle)}
         {renderRow(layout.bottom)}
      </div>
   );
};

export default MediaGridLayout;
