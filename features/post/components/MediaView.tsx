import { useModal } from '@/features/modal/hooks/useModal';
import { MediaGridMapping, RowConfig } from '../constants/MediaGridMapping';
import { PostMedia } from '../types/post.responce';
import { MODALS } from '@/features/modal/constants/modals';

const colsClassMap: Record<number, string> = {
   1: 'grid-cols-1',
   2: 'grid-cols-2',
   3: 'grid-cols-3',
   4: 'grid-cols-4',
};

const MediaView = ({ media }: { media: PostMedia[] }) => {
   const { openModal } = useModal();
   const layout = MediaGridMapping[media.length - 1];

   const normalized = media.map((item) => ({
      src: item.url,
      type: `${item.type}/`,
   }));

   let cursor = 0;

   const renderRow = (row?: RowConfig) => {
      if (!row) return null;
      const startIndex = cursor;
      const items = media.slice(cursor, cursor + row.count);
      cursor += row.count;

      if (!items.length) return null;

      return (
         <div className={` grid gap-1 ${colsClassMap[row.cols]}`}>
            {items.map((item, i) => {
               const globalIndex = startIndex + i;
               return (
                  <div
                     onClick={() =>
                        openModal(MODALS.PREVIEW, {
                           items: normalized,
                           index: globalIndex,
                        })
                     }
                     key={item.url}
                     className="relative aspect-1.5/1 overflow-hidden rounded-lg bg-black"
                  >
                     {item.type === 'image' ? (
                        <img
                           src={item.url}
                           className="w-full h-full object-cover hover:scale-[1.02] hover:opacity-90 transition cursor-pointer"
                        />
                     ) : (
                        <>
                           <video
                              src={item.url}
                              className="w-full h-full object-cover  hover:scale-[1.02] hover:opacity-90 transition cursor-pointer"
                              preload="metadata"
                           />
                           <div className="textLabel text-neutralWhite-100 bg-neutralBlack-100/40 absolute top-1 left-1 px-1 rounded-[2px]">
                              vid
                           </div>
                        </>
                     )}
                  </div>
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

export default MediaView;
