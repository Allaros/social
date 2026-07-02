import { RefObject, useEffect, useLayoutEffect, useRef } from 'react';

type UseAutoScrollOnNewMessageParams = {
   containerRef: RefObject<HTMLDivElement | null>;

   lastMessageId: number | null;
   isInitialized: boolean;

   scrollToBottom: (behavior?: ScrollBehavior) => void;
   behavior?: ScrollBehavior;
};

export const useAutoScrollOnNewMessage = ({
   containerRef,
   lastMessageId,
   isInitialized,
   scrollToBottom,
   behavior = 'smooth',
}: UseAutoScrollOnNewMessageParams) => {
   const viewportAnchorRef = useRef<HTMLDivElement>(null);

   const shouldAutoScrollRef = useRef(false);
   const previousLastMessageId = useRef<number | null>(null);

   useEffect(() => {
      const root = containerRef.current;
      const anchor = viewportAnchorRef.current;

      if (!root || !anchor) {
         return;
      }

      const observer = new IntersectionObserver(
         ([entry]) => {
            shouldAutoScrollRef.current = entry.isIntersecting;
         },
         {
            root,
            threshold: 0,
         }
      );

      observer.observe(anchor);

      return () => observer.disconnect();
   }, [containerRef, isInitialized]);

   useLayoutEffect(() => {
      if (!isInitialized) {
         previousLastMessageId.current = lastMessageId;
         return;
      }

      if (lastMessageId == null) {
         return;
      }

      if (previousLastMessageId.current === null) {
         previousLastMessageId.current = lastMessageId;
         return;
      }

      if (previousLastMessageId.current === lastMessageId) {
         return;
      }

      previousLastMessageId.current = lastMessageId;

      if (!shouldAutoScrollRef.current) {
         return;
      }

      scrollToBottom(behavior);
   }, [lastMessageId, isInitialized, scrollToBottom, behavior]);

   return {
      viewportAnchorRef,
   };
};
