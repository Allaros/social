import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Check, UserPlus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SendIco from '@/public/icons/Send.svg';
import { cn } from '@/shared/lib/utils';

const ActionButtons = ({
   link,
   func,
   isFollowed,
}: {
   link: string;
   func: () => void;
   isFollowed?: boolean;
}) => {
   return (
      <div className="textBody-medium flex max-md:flex-row items-stretch gap-2 max-md:gap-4">
         <button
            onClick={func}
            className={cn(
               'flex items-center justify-center bg-primary-900 cursor-pointer transition-colors text-neutralWhite-100 hover:bg-primary-800 rounded-sm z-10',
               'p-1.5',
               'md:p-2'
            )}
         >
            <AnimatePresence mode="wait" initial={false}>
               <motion.span
                  key={isFollowed ? 'followed' : 'not-followed'}
                  initial={{ opacity: 0, scale: 0.85, y: 2 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -2 }}
                  transition={{
                     duration: 0.16,
                     ease: 'easeOut',
                  }}
                  className="flex items-center justify-center"
               >
                  {isFollowed ? <Check size={18} /> : <UserPlus size={18} />}
               </motion.span>
            </AnimatePresence>
         </button>
         <Link
            href={link}
            className={cn(
               'hover:bg-neutralWhite-500 border border-neutralWhite-500 cursor-pointer max-md:bg-neutralWhite-500 rounded-sm transition-colors flex items-center justify-center gap-1 z-10',
               'p-1.5',
               'md:p-2'
            )}
         >
            <Image
               src={SendIco}
               alt={'send message'}
               width={18}
               height={18}
            ></Image>
         </Link>
      </div>
   );
};

export default ActionButtons;
