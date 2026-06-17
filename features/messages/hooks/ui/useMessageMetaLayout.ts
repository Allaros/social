import { useLayoutEffect, useRef, useState } from 'react';
import {
   MessageResponseType,
   MessagesAttachmentEnum,
} from '../../types/messages.types';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

export type MessageMetaMode = 'inline' | 'stacked' | 'media-overlay';

type MessageMetaLayout = {
   mode: MessageMetaMode;
   contentPaddingRight: number;
   contentPaddingBottom: number;
   metaClassName: string;
};

export const useMessageMetaLayout = (message: MessageResponseType) => {
   const isMobile = useIsMobile();
   const containerRef = useRef<HTMLDivElement>(null);
   const metaRef = useRef<HTMLDivElement>(null);

   const [layout, setLayout] = useState<MessageMetaLayout>({
      mode: 'inline',
      contentPaddingRight: 8,
      contentPaddingBottom: 0,
      metaClassName: 'bottom-1',
   });

   useLayoutEffect(() => {
      const container = containerRef.current;
      const meta = metaRef.current;

      if (!container || !meta) {
         return;
      }

      const attachments = message.attachments ?? [];

      const hasSingleMediaAttachment =
         attachments.length === 1 &&
         [MessagesAttachmentEnum.IMAGE, MessagesAttachmentEnum.VIDEO].includes(
            attachments[0].type
         );

      if (hasSingleMediaAttachment) {
         setLayout({
            mode: 'media-overlay',
            contentPaddingRight: 0,
            contentPaddingBottom: 0,
            metaClassName:
               'bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm',
         });

         return;
      }

      const containerWidth = container.offsetWidth;
      const chatWidth = container.parentElement?.offsetWidth ?? containerWidth;

      const ratio = containerWidth / chatWidth;

      if (ratio < 0.45) {
         setLayout({
            mode: 'inline',
            contentPaddingRight: meta.offsetWidth + 8,
            contentPaddingBottom: 4,
            metaClassName: 'bottom-1.25 right-0.5',
         });

         return;
      }

      setLayout({
         mode: 'stacked',
         contentPaddingRight: 8,
         contentPaddingBottom: meta.offsetHeight,
         metaClassName: 'bottom-1 right-0.5',
      });
   }, [
      message.content?.text,
      message.editedAt,
      message.reply?.id,
      message.forwardedFrom?.id,
      message.attachments.length,
      isMobile,
   ]);

   return {
      containerRef,
      metaRef,
      layout,
   };
};
