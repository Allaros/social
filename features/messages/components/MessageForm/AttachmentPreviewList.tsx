import { AttachmentItem } from '../../hooks/queries/useAttachments';
import AttachmentPreview from './AttachmentPreview';

type AttachmentPreviewListProps = {
   attachments: AttachmentItem[];

   onRemove: (id: string) => void;

   onRetry: (id: string) => void;

   onClear: () => void;
};

const getAttachmentSpelling = (length: number) => {
   if (length === 1) {
      return `${length} вложение`;
   }
   if (length < 5) {
      return `${length} вложения`;
   }

   return `${length} вложений`;
};

export const AttachmentPreviewList = ({
   attachments,
   onRemove,
   onClear,
   onRetry,
}: AttachmentPreviewListProps) => {
   return (
      <div>
         <div className="flex items-center justify-between py-1 px-2">
            <p className="textLabel text-neutralBlack-600">
               {getAttachmentSpelling(attachments.length)}
            </p>
            <button
               onClick={onClear}
               className="textLabel-medium text-danger-700 hover:text-danger-900 transition-colors cursor-pointer"
            >
               Очистить
            </button>
         </div>
         <div className="flex items-center px-2 gap-2">
            {attachments.map((attachment) => (
               <AttachmentPreview
                  onRemove={onRemove}
                  key={attachment.id}
                  attachment={attachment}
                  onRetry={onRetry}
               />
            ))}
         </div>
      </div>
   );
};
