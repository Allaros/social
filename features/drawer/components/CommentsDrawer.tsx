'use client';

import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetHeader,
   SheetTitle,
} from '@/shared/components/ui/sheet';
import { CommentsScreen } from '../types/drawer.interface';
import CommentsView from './CommentsView';
import ReplyView from './ReplyView';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CommentsDrawer = ({
   open,
   screen,
   onClose,
   onBack,
}: {
   open: boolean;
   screen: CommentsScreen | null;
   onClose: () => void;
   onBack: () => void;
}) => {
   const [mounted, setMounted] = useState(open);

   useEffect(() => {
      if (open) setMounted(true);
   }, [open]);

   const handleAnimationEnd = () => {
      if (!open) setMounted(false);
   };

   if (!mounted || !screen) return null;

   const postId = screen.payload.postId;

   return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
         <SheetContent
            onAnimationEnd={handleAnimationEnd}
            side="bottom"
            className="h-[85vh] max-w-none w-screen flex flex-col p-0 fixed bottom-0 right-0 top-auto translate-y-0 rounded-t-sm rounded-b-none!"
         >
            <SheetHeader className="p-4 mb-2 flex items-center justify-between flex-row max-md:px-3 border-b border-neutralWhite-400">
               <SheetTitle className="mb-0">Комментарии</SheetTitle>
               <SheetClose className="mb-0 cursor-pointer hover:bg-neutralWhite-400 rounded-sm p-0.5">
                  <X className="h-5 w-5"></X>
               </SheetClose>
            </SheetHeader>
            <div className="relative flex-1 min-h-0 w-full">
               <CommentsView
                  postId={postId}
                  postAuthorUsername={screen.payload.postAuthorUsername}
               />
            </div>
            <AnimatePresence>
               {screen.type === 'reply' && (
                  <>
                     <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"
                        onClick={onBack}
                     />

                     <motion.div
                        key="reply"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{
                           type: 'spring',
                           stiffness: 320,
                           damping: 30,
                        }}
                        className="absolute inset-x-0 bottom-0 z-20 bg-neutralWhite-100 rounded-t-sm pt-4"
                     >
                        <ReplyView payload={screen.payload} onBack={onBack} />
                     </motion.div>
                  </>
               )}
            </AnimatePresence>
         </SheetContent>
      </Sheet>
   );
};

export default CommentsDrawer;
