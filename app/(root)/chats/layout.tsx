import ChatFeed from '@/features/chats/components/ChatFeed';
import React from 'react';

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="card grid grid-cols-[1fr_2fr]">
         <div className="grid grid-cols-subgrid col-span-2 border-b border-neutralWhite-400">
            <div className="px-4 py-2">
               {' '}
               <p className="h5">Сообщения</p>{' '}
            </div>
            <div> </div>
         </div>
         <div>
            <ChatFeed />
         </div>
         <div>{children}</div>
      </div>
   );
};

export default ChatsLayout;
