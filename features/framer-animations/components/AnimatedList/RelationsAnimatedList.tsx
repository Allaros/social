'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
   children: React.ReactNode[];
};

const RelationsAnimatedList = ({ children }: Props) => {
   return (
      <AnimatePresence initial={false} mode="sync">
         {children.map((child, index) => (
            <motion.div
               key={(child as any).key}
               initial={{
                  opacity: 0,
                  x: -8,
               }}
               animate={{
                  opacity: 1,
                  x: 0,
               }}
               exit={{
                  opacity: 0,
                  x: -6,
               }}
               transition={{
                  opacity: {
                     duration: 0.16,
                  },

                  x: {
                     type: 'spring',
                     stiffness: 420,
                     damping: 34,
                  },
               }}
            >
               {child}
            </motion.div>
         ))}
      </AnimatePresence>
   );
};

export default RelationsAnimatedList;
