'use client';

import ROUTES from '@/shared/constants/routes';
import Image from 'next/image';
import React from 'react';
import SendIco from '@/public/icons/Send.svg';
import { useCreateChat } from '@/features/chats/hooks/useCreateChat';
import { useRouter } from 'next/navigation';

const RelationStartChatButton = ({ receiverId }: { receiverId: number }) => {
   const router = useRouter();

   const { createDirect } = useCreateChat();

   const handleChat = () => {
      createDirect.mutate(
         { receiverId },
         {
            onSuccess: (data) => {
               router.push(`${ROUTES.main.chats}/${data.identifier}`);
            },
         }
      );
   };

   return (
      <div>
         <button
            onClick={handleChat}
            className="p-2 flex items-center justify-center gap-2 hover:bg-neutralWhite-400 transition-colors duration-200 curosr-pointer border border-neutralWhite-400 rounded-sm"
         >
            <span className="max-md:hidden textBody">Написать</span>
            <Image
               src={SendIco}
               alt={'write a message'}
               width={18}
               height={18}
            />
         </button>
      </div>
   );
};

export default RelationStartChatButton;
