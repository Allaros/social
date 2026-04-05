'use client';

import {
   motion,
   AnimatePresence,
   useMotionValue,
   useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PreviewPayload } from '../types/modalPayload';

interface Props {
   payload: PreviewPayload;
   close: () => void;
}

const swipeXThreshold = 80;
const swipeYThreshold = 100;
const BASE_OPACITY = 0.6;

const variants = {
   enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
   }),
   center: {
      x: 0,
      opacity: 1,
   },
   exit: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
   }),
};

export default function PreviewModal({ payload, close }: Props) {
   const { items, index } = payload;
   const [isClosing, setIsClosing] = useState(false);
   const [exitY, setExitY] = useState(0);

   const [[current, dir], setState] = useState<[number, number]>([index, 0]);

   const dragY = useMotionValue(0);

   const limitedY = useTransform(dragY, (v) =>
      Math.max(Math.min(v, 120), -120)
   );

   const backdropOpacity = useTransform(
      dragY,
      [-200, 0, 200],
      [0, BASE_OPACITY, 0]
   );

   const scale = useTransform(dragY, [-200, 0, 200], [0.92, 1, 0.92]);

   const axisRef = useRef<'x' | 'y' | null>(null);

   const paginate = (direction: number) => {
      setState(([prev]) => {
         let next = prev + direction;

         if (next < 0) next = items.length - 1;
         if (next >= items.length) next = 0;

         return [next, direction];
      });
   };

   const isDragging = useRef(false);

   const handleDragStart = () => {
      isDragging.current = true;
   };

   const handleDrag = (_: any, info: any) => {
      const { offset } = info;

      if (!axisRef.current) {
         if (Math.abs(offset.x) > Math.abs(offset.y)) {
            axisRef.current = 'x';
         } else {
            axisRef.current = 'y';
         }
      }

      if (axisRef.current === 'y') {
         dragY.set(offset.y);
      }
   };

   const handleDragEnd = (_: any, info: any) => {
      const { x, y } = info.offset;

      if (axisRef.current === 'x') {
         if (x < -swipeXThreshold) paginate(1);
         else if (x > swipeXThreshold) paginate(-1);
      } else if (axisRef.current === 'y' && Math.abs(y) > swipeYThreshold) {
         dragY.set(y);
         setExitY(y);
         setIsClosing(true);

         setTimeout(close, 0);
         return;
      }

      if (axisRef.current === 'y' && Math.abs(y) > swipeYThreshold) {
         dragY.set(y);
         setIsClosing(true);

         setExitY(y);

         setTimeout(close, 0);

         return;
      }

      axisRef.current = null;
      dragY.set(0);
   };

   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         if (e.key === 'ArrowRight') paginate(1);
         if (e.key === 'ArrowLeft') paginate(-1);
         if (e.key === 'Escape') close();
      };

      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
   }, []);

   const item = items[current];

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center select-none"
         onClick={close}
      >
         <motion.div
            className="absolute inset-0 bg-neutralBlack-900"
            style={{ opacity: backdropOpacity }}
         />

         {items.length > 1 && (
            <>
               <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                     e.stopPropagation();
                     paginate(-1);
                  }}
                  className="absolute left-0 z-50 cursor-pointer text-white bg-black/50 hover:bg-black/70 transition-colors h-40 px-2 rounded-r-sm  max-md:top-[92%] max-md:h-12 max-md:left-4 max-md:rounded-sm"
               >
                  <ChevronLeft size={36} />
               </motion.button>

               <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                     e.stopPropagation();
                     paginate(1);
                  }}
                  className="absolute right-0 z-50 cursor-pointer text-white bg-black/50 hover:bg-black/70 transition-colors h-40 px-2 rounded-l-sm max-md:top-[92%] max-md:h-12 max-md:right-4 max-md:rounded-sm"
               >
                  <ChevronRight size={36} />
               </motion.button>
            </>
         )}

         <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
         >
            <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               transition={{ duration: 0.2 }}
               onClick={close}
               className="absolute z-50 top-2 right-2 text-white p-1 bg-white/20 hover:bg-white/30 rounded cursor-pointer"
            >
               <X className="size-8" />
            </motion.button>

            <AnimatePresence initial={false} custom={dir}>
               <motion.div
                  key={current}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDrag={handleDrag}
                  onDragStart={handleDragStart}
                  onDragEnd={(_: any, info: any) => {
                     handleDragEnd(_, info);
                     isDragging.current = false;
                  }}
                  style={{
                     y: axisRef.current === 'y' ? limitedY : 0,
                     scale,
                  }}
                  className="absolute w-full h-full flex items-center justify-center"
                  initial={
                     isClosing ? { y: exitY, opacity: 1, scale: 1 } : 'enter'
                  }
                  animate={
                     isClosing
                        ? {
                             y: exitY > 0 ? 200 : -200,
                             opacity: 0,
                             scale: 0.92,
                          }
                        : 'center'
                  }
                  exit={isClosing ? {} : 'exit'}
                  custom={dir}
                  variants={variants}
                  transition={{
                     y: { type: 'spring', stiffness: 260, damping: 25 },
                     opacity: { duration: 0.2 },
                  }}
                  onAnimationComplete={() => {
                     if (isClosing) close();
                  }}
               >
                  {item.type.startsWith('image/') ? (
                     <img
                        src={item.src}
                        className="max-w-[80vw] max-h-[90vh] object-contain select-none pointer-events-none rounded-sm"
                        draggable={false}
                     />
                  ) : (
                     <video
                        src={item.src}
                        className="max-w-[80vw] max-h-[90vh] rounded-sm"
                        controls={true}
                        draggable={false}
                     />
                  )}
               </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
               <div className="absolute bottom-4 text-white text-sm bg-black/60 px-3 py-1 rounded">
                  {current + 1} / {items.length}
               </div>
            )}
         </div>
      </div>
   );
}
