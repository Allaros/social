import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MessageResponseType } from '../../types/messages.types';
import { useMessagesPagination } from './useMessagePagination';
import { useMessagesList } from './useMessagesList';
import { useMessagesScroller } from './useMessagesScroller';
import { useAutoScrollOnNewMessage } from './useAutoScrollToNewMessage';

type UseChatControlParams = {
   messages: MessageResponseType[];

   hasNextPage: boolean;
   isFetching: boolean;

   fetchNextPage: () => Promise<unknown>;
};

export const useChatControl = ({
   messages,

   hasNextPage,
   isFetching,

   fetchNextPage,
}: UseChatControlParams) => {
   const unreadAnchorRef = useRef<HTMLDivElement>(null);
   const bottomRef = useRef<HTMLDivElement>(null);

   const scroll = useMessagesScroller();

   const list = useMessagesList({
      messages,
   });

   const [initialScrollCompleted, setInitialScrollCompleted] = useState(false);

   const initializedRef = useRef(false);

   const pagination = useMessagesPagination({
      containerRef: scroll.containerRef,

      hasNextPage,
      isFetching,
      fetchNextPage,

      initialScrollCompleted,

      savePosition: scroll.savePosition,
      restorePosition: scroll.restorePosition,
   });

   const { viewportAnchorRef } = useAutoScrollOnNewMessage({
      containerRef: scroll.containerRef,

      lastMessageId: list.lastMessage?.id ?? null,
      isInitialized: initialScrollCompleted,

      scrollToBottom: scroll.scrollToBottom,
   });

   useLayoutEffect(() => {
      if (initializedRef.current) {
         return;
      }

      if (!list.orderedMessages.length) {
         return;
      }

      initializedRef.current = true;

      const target = unreadAnchorRef.current ?? bottomRef.current;

      if (!target) {
         return;
      }

      scroll.scrollToElementNextFrame(target, {
         block: unreadAnchorRef.current ? 'center' : 'end',
      });
   }, [list.orderedMessages, scroll]);

   useEffect(() => {
      if (initialScrollCompleted) {
         return;
      }

      const container = scroll.containerRef.current;
      const target = unreadAnchorRef.current ?? bottomRef.current;

      if (!container || !target) {
         return;
      }

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (!entry.isIntersecting) {
               return;
            }

            observer.disconnect();

            requestAnimationFrame(() => {
               setInitialScrollCompleted(true);
            });
         },
         {
            root: container,
            threshold: 0.95,
         }
      );

      observer.observe(target);

      return () => observer.disconnect();
   }, [initialScrollCompleted, list.orderedMessages, scroll.containerRef]);

   return {
      scroll: {
         ...scroll,
         unreadAnchorRef,
         bottomRef,
         viewportAnchorRef,
      },
      list,
      pagination,
   };
};
