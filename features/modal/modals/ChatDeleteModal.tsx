import React from 'react';
import { motion } from 'framer-motion';
import CustomButton from '@/shared/components/CustomButton';
import CloseIco from '@/public/icons/X.svg';
import { ChatDeletePayload } from '../types/modalPayload';

type Props = {
   payload: ChatDeletePayload;
   close: () => void;
};

const ChatDeleteModal = ({ payload, close }: Props) => {
   const { onDeleteForMe, onDeleteForEveryone } = payload;

   const handleDeleteForMe = async () => {
      await onDeleteForMe();
      close();
   };

   const handleDeleteForEveryone = async () => {
      await onDeleteForEveryone?.();
      close();
   };

   return (
      <motion.div
         onClick={close}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="fixed inset-0 bg-neutralBlack-900/40 flex items-center justify-center z-50"
      >
         <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="card px-6 py-6 mx-4 max-w-125 w-full relative"
         >
            <CustomButton
               buttonFunc={close}
               imageSrc={CloseIco}
               alt="Close modal"
               h={20}
               w={20}
               className="cursor-pointer hover:bg-neutralWhite-400 rounded-full p-1.5 absolute top-1 right-1"
            />

            <div className="space-y-4">
               <div>
                  <h3 className="h5">Удаление чата</h3>

                  <p className="textBody text-neutralBlack-600 mt-2">
                     Удалить чат?
                  </p>
               </div>

               <div className="flex flex-col gap-2">
                  <button
                     onClick={handleDeleteForEveryone}
                     className="bg-danger-600 text-white py-2 px-4 rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                     Удалить для обоих
                  </button>

                  <button
                     onClick={handleDeleteForMe}
                     className="bg-neutralWhite-400 py-2 px-4 rounded-sm hover:bg-neutralWhite-500 transition-colors cursor-pointer"
                  >
                     Покинуть чат
                  </button>
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default ChatDeleteModal;
