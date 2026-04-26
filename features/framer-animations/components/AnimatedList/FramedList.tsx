'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FramedPreset, LayoutMode } from '../../types/list-anim.interface';
import { framedPresets } from '../../constants/presets';

type Props = {
   children: React.ReactNode;
   preset?: FramedPreset;
   stagger?: number;
   layoutMode?: LayoutMode;
};

export const FramedList = ({
   children,
   preset = 'feed',
   stagger,
   layoutMode = 'full',
}: Props) => {
   const config = framedPresets[preset];

   const containerVariants = {
      hidden: {},
      show: {
         transition: {
            staggerChildren: stagger ?? config.stagger,
         },
      },
   };

   const containerLayout = layoutMode === 'full' ? config.layout : false;

   const itemLayout = layoutMode === 'none' ? false : 'position';

   return (
      <motion.div
         layout={containerLayout}
         variants={containerVariants}
         initial="hidden"
         animate="show"
         className="flex flex-col gap-4"
      >
         <AnimatePresence initial={false} mode={config.mode}>
            {React.Children.map(children, (child, index) => (
               <motion.div
                  layout={itemLayout}
                  initial={config.item.initial}
                  animate={config.item.animate}
                  exit={config.item.exit}
                  transition={config.item.transition}
                  custom={index}
               >
                  {child}
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
