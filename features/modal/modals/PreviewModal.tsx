import { motion } from 'framer-motion';
import { PreviewPayload } from '../types/modalPayload';
import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
   payload: PreviewPayload;
   close: () => void;
}

const PreviewModal = ({ payload, close }: Props) => {
   const { items, index } = payload;

   const [currentIndex, setCurrentIndex] = useState(index);

   const current = items[currentIndex];

   const next = () => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
   };

   const prev = () => {
      setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
   };

   useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
         if (e.key === 'ArrowRight') next();
         if (e.key === 'ArrowLeft') prev();
         if (e.key === 'Escape') close();
      };

      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
   }, []);

   return (
      <motion.div
         onClick={close}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="fixed top-0 left-0 w-full h-full bg-neutralBlack-900/40 flex items-center justify-center z-50 p-4"
      >
         {items.length > 1 && (
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  prev();
               }}
               className="absolute left-0 z-20 h-40 cursor-pointer rounded-r-sm text-white bg-neutralBlack-900/50 hover:bg-neutralBlack-900/70 transition-colors"
            >
               <ChevronLeft size={36} />
            </button>
         )}
         <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto flex items-center  justify-center bg-neutralWhite-500 rounded-sm border-2 border-neutralWhite-500 overflow-hidden shadow-2xl shadow-neutralBlack-600"
         >
            {current.type.startsWith('image/') ? (
               <img
                  src={current.src}
                  className="max-w-full max-h-[90vh] object-contain"
               />
            ) : (
               <video
                  src={current.src}
                  controls
                  className="max-w-full max-h-[90vh]"
               />
            )}

            {items.length > 1 && (
               <div className="absolute bottom-2 text-white text-sm bg-black/60 px-2 py-1 rounded">
                  {currentIndex + 1} / {items.length}
               </div>
            )}
         </motion.div>
         {items.length > 1 && (
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  next();
               }}
               className="absolute right-0 px-1 z-10 h-40 cursor-pointer rounded-l-sm text-white text-2xl bg-neutralBlack-900/50 hover:bg-neutralBlack-900/70 transition-colors"
            >
               <ChevronRight size={36} />
            </button>
         )}
      </motion.div>
   );
};

export default PreviewModal;
