'use client';

import ChatFeed from '@/features/chats/components/ChatFeed';
import ChatHeader from '@/features/chats/components/ChatHeader';
import { MessageComposerProvider } from '@/features/messages/providers/MessageComposerProvider';
import { MessagesSelectionProvider } from '@/features/messages/providers/MessageSelectionProvider';
import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat');

   return (
      <MessagesSelectionProvider chatIdentifier={activeIdentifier}>
         <MessageComposerProvider>
            {/* DESKTOP */}
            <div className="hidden md:grid card h-[calc(100vh-10.5rem)] min-h-0 grid-cols-[1fr_2fr] max-lg:grid-cols-[1fr_auto] grid-rows-[auto_1fr]">
               <div className="grid grid-cols-subgrid col-span-2 border-b border-neutralWhite-400 items-center h-16">
                  <div className="px-4 py-2 border-r border-neutralWhite-400">
                     <p className="h5">Чаты</p>
                  </div>

                  <ChatHeader />
               </div>

               <div className="py-4 min-h-0 min-w-0 h-full border-r border-neutralWhite-400">
                  <ChatFeed />
               </div>

               {children}
            </div>

            {/* MOBILE */}
            <div
               className={cn(
                  'md:hidden card  overflow-hidden',
                  activeIdentifier ? 'h-screen' : 'h-[calc(100vh-4rem)]'
               )}
            >
               <motion.div
                  className="grid grid-cols-[100vw_100vw] h-full min-h-0"
                  animate={{
                     x: activeIdentifier ? '-100vw' : '0vw',
                  }}
                  transition={{
                     duration: 0.25,
                     ease: 'easeInOut',
                  }}
               >
                  {/* список чатов */}
                  <div className="h-full flex flex-col">
                     <div className="h-16 border-b border-neutralWhite-400 px-4 flex items-center">
                        <p className="h5">Чаты</p>
                     </div>

                     <div className="flex-1 h-full pt-2 min-h-0">
                        <ChatFeed />
                     </div>
                  </div>

                  {/* сообщения */}
                  <div className="h-full flex flex-col min-h-0">
                     <div className="border-b border-neutralWhite-400">
                        <ChatHeader />
                     </div>

                     <div className="flex-1 min-h-0 min-w-0 h-full max-h-full">
                        {children}
                     </div>
                  </div>
               </motion.div>
            </div>
         </MessageComposerProvider>
      </MessagesSelectionProvider>
   );
};

export default ChatsLayout;
