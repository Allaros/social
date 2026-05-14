// features/notifications/hooks/useSeenNotifications.ts

import { useEffect, useRef } from 'react';
import { useMarkAsSeen } from './useMarkAsSeen';
import { createObserver } from '@/shared/observers/createObserver';

export const useSeenNotifications = () => {
   const buffer = useRef<Set<number>>(new Set());

   const sent = useRef<Set<number>>(new Set());

   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const { mutate } = useMarkAsSeen();

   const flush = () => {
      if (buffer.current.size === 0) return;

      const idsToSend = Array.from(buffer.current).filter(
         (id) => !sent.current.has(id)
      );

      if (idsToSend.length === 0) {
         buffer.current.clear();
         timeoutRef.current = null;
         return;
      }

      mutate({ ids: idsToSend });

      idsToSend.forEach((id) => sent.current.add(id));

      buffer.current.clear();
      timeoutRef.current = null;
   };

   const scheduleFlush = () => {
      if (timeoutRef.current) return;

      timeoutRef.current = setTimeout(() => {
         flush();
      }, 1000);
   };

   const observerRef = useRef<IntersectionObserver | null>(null);

   useEffect(() => {
      observerRef.current = createObserver(
         (id) => {
            if (sent.current.has(id)) return;

            buffer.current.add(id);
            scheduleFlush();
         },
         {
            threshold: 0.6,
         }
      );

      return () => {
         observerRef.current?.disconnect();

         if (buffer.current.size > 0) {
            flush();
         }
      };
   }, []);

   const observe = (el: HTMLElement | null, id: number, isSeen: boolean) => {
      if (!el || isSeen) return;

      if (sent.current.has(id)) return;

      el.dataset.id = String(id);
      observerRef.current?.observe(el);
   };

   return { observe };
};
