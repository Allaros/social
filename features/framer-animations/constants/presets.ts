import { FramedPreset } from '../types/list-anim.interface';

export const framedPresets: Record<
   FramedPreset,
   {
      stagger: number;
      item: {
         initial: any;
         animate: any;
         exit: any;
         transition: any;
      };
      layout: boolean;
      mode: 'sync' | 'popLayout';
   }
> = {
   comments: {
      stagger: 0.035,
      layout: true,
      mode: 'popLayout',
      item: {
         initial: { opacity: 0, x: -12, y: 6 },
         animate: { opacity: 1, x: 0, y: 0 },
         exit: { opacity: 0, x: 12, y: -6 },
         transition: {
            type: 'spring',
            stiffness: 420,
            damping: 30,
         },
      },
   },

   replies: {
      stagger: 0.02,
      layout: true,
      mode: 'sync',
      item: {
         initial: { opacity: 0, y: 6 },
         animate: { opacity: 1, y: 0 },
         exit: { opacity: 0, y: -6 },
         transition: {
            duration: 0.15,
         },
      },
   },

   feed: {
      stagger: 0.05,
      layout: true,
      mode: 'popLayout',
      item: {
         initial: { opacity: 0, y: 10 },
         animate: { opacity: 1, y: 0 },
         exit: { opacity: 0, y: -10 },
         transition: {
            type: 'spring',
            stiffness: 380,
            damping: 32,
         },
      },
   },

   notifications: {
      stagger: 0.06,
      layout: true,
      mode: 'popLayout',
      item: {
         initial: { opacity: 0, x: 20 },
         animate: { opacity: 1, x: 0 },
         exit: { opacity: 0, x: -20 },
         transition: {
            type: 'spring',
            stiffness: 500,
            damping: 35,
         },
      },
   },

   minimal: {
      stagger: 0,
      layout: false,
      mode: 'sync',
      item: {
         initial: { opacity: 0 },
         animate: { opacity: 1 },
         exit: { opacity: 0 },
         transition: {
            duration: 0.1,
         },
      },
   },
};
