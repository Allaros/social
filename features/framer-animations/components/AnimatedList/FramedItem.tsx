'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

type FramedAnimation = {
   initial?: any;
   animate?: any;
   exit?: any;
   transition?: any;
};

type FramedItemProps = {
   children: React.ReactNode;
   id?: string | number;
   animation?: FramedAnimation;
   index?: number;
} & HTMLMotionProps<'div'>;

const defaultAnimation = {
   initial: { opacity: 0, y: -10 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: 10 },
   transition: {
      opacity: { duration: 0.15 },
      y: { type: 'spring', stiffness: 420, damping: 32 },
      layout: { duration: 0.2 },
   },
};

export const FramedItem = ({
   children,
   id,
   animation,
   ...props
}: FramedItemProps) => {
   const anim = { ...defaultAnimation, ...animation };

   return (
      <motion.div
         layout
         key={id}
         initial={anim.initial}
         animate={anim.animate}
         exit={anim.exit}
         transition={anim.transition}
         {...props}
      >
         {children}
      </motion.div>
   );
};
