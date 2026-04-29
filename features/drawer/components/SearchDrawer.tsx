'use client';

import { Sheet, SheetContent, SheetTitle } from '@/shared/components/ui/sheet';
import GlobalSearch from '@/features/search/GlobalSearch';
import { motion } from 'framer-motion';

const SearchDrawer = ({
   open,
   onClose,
}: {
   open: boolean;
   onClose: () => void;
}) => {
   return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
         <SheetTitle className="hidden">Поиск</SheetTitle>

         <SheetContent
            side="right"
            className="w-screen h-screen p-0 overflow-hidden"
         >
            <motion.div
               className="h-full w-full bg-neutralWhite-100"
               drag="x"
               dragDirectionLock
               dragConstraints={{ left: 0, right: 300 }}
               onDragEnd={(e, info) => {
                  if (info.offset.x > 120) {
                     onClose();
                  }
               }}
            >
               <div className="p-4">
                  <GlobalSearch closeFunc={onClose} />
               </div>
            </motion.div>
         </SheetContent>
      </Sheet>
   );
};

export default SearchDrawer;
