import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useMessagesScroller = () => {
   const containerRef = useRef<HTMLDivElement>(null);

   const savedScrollTop = useRef(0);
   const savedScrollHeight = useRef(0);

   const pinnedOffset = useRef(0);

   const savePosition = useCallback(() => {
      const container = containerRef.current;

      if (!container) {
         return;
      }

      savedScrollTop.current = container.scrollTop;
      savedScrollHeight.current = container.scrollHeight;
   }, []);

   const restorePosition = useCallback(() => {
      const container = containerRef.current;

      if (!container) {
         return;
      }

      const delta = container.scrollHeight - savedScrollHeight.current;

      container.scrollTop = savedScrollTop.current + delta;
   }, []);

   const pinToElement = useCallback((element: HTMLElement | null) => {
      const container = containerRef.current;

      if (!container || !element) {
         return;
      }

      pinnedOffset.current =
         element.getBoundingClientRect().top -
         container.getBoundingClientRect().top;
   }, []);

   const restorePinnedElement = useCallback((element: HTMLElement | null) => {
      const container = containerRef.current;

      if (!container || !element) {
         return;
      }

      const currentOffset =
         element.getBoundingClientRect().top -
         container.getBoundingClientRect().top;

      container.scrollTop += currentOffset - pinnedOffset.current;
   }, []);

   const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
      const container = containerRef.current;

      if (!container) {
         return;
      }

      container.scrollTo({
         top: container.scrollHeight,
         behavior,
      });
   }, []);

   const scrollToTop = useCallback((behavior: ScrollBehavior = 'auto') => {
      containerRef.current?.scrollTo({
         top: 0,
         behavior,
      });
   }, []);

   const scrollToElement = useCallback(
      (
         element: HTMLElement | null,
         options?: {
            behavior?: ScrollBehavior;
            block?: ScrollLogicalPosition;
            inline?: ScrollLogicalPosition;
         }
      ) => {
         if (!element) {
            return;
         }

         element.scrollIntoView({
            behavior: options?.behavior ?? 'auto',
            block: options?.block ?? 'center',
            inline: options?.inline ?? 'nearest',
         });
      },
      []
   );

   const scrollToBottomNextFrame = useCallback(
      (behavior: ScrollBehavior = 'auto') => {
         requestAnimationFrame(() => {
            scrollToBottom(behavior);
         });
      },
      [scrollToBottom]
   );

   const scrollToElementNextFrame = useCallback(
      (
         element: HTMLElement | null,
         options?: {
            behavior?: ScrollBehavior;
            block?: ScrollLogicalPosition;
            inline?: ScrollLogicalPosition;
         }
      ) => {
         requestAnimationFrame(() => {
            scrollToElement(element, options);
         });
      },
      [scrollToElement]
   );

   const isAtTop = useCallback((threshold = 0) => {
      const container = containerRef.current;

      if (!container) {
         return false;
      }

      return container.scrollTop <= threshold;
   }, []);

   const getScrollTop = useCallback(() => {
      return containerRef.current?.scrollTop ?? 0;
   }, []);

   return {
      containerRef,

      scrollToBottom,
      scrollToTop,
      scrollToElement,

      scrollToBottomNextFrame,
      scrollToElementNextFrame,

      savePosition,
      restorePosition,

      pinToElement,
      restorePinnedElement,

      isAtTop,
      getScrollTop,
   };
};
