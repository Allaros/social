import React from 'react';
import { MessageComposerState } from '../../types/messages-actions.types';
import { X } from 'lucide-react';
import { pluralize } from '@/shared/utils/pluralize';

type Props = {
   action: MessageComposerState;
   onClose: () => void;
};

const MessageComposerPreview = ({ action, onClose }: Props) => {
   const isVisible = !!action;

   const formatAttachmentsCount = (count: number) => {
      return `${count} ${pluralize(count, 'вложение', 'вложения', 'вложений')}`;
   };

   let previewText: string | null = null;
   if (action) {
      switch (action.type) {
         case 'reply': {
            const replyText =
               action.message.content?.text ||
               (action.message.attachments?.length
                  ? formatAttachmentsCount(action.message.attachments.length)
                  : 'Сообщение');

            previewText = `Ответ: ${replyText.slice(0, 80)}${replyText.length > 80 ? '...' : ''}`;
            break;
         }

         case 'edit': {
            const editText =
               action.message.content?.text ||
               (action.message.attachments?.length
                  ? formatAttachmentsCount(action.message.attachments.length)
                  : 'Сообщение');

            previewText = `Редактирование: ${editText.slice(0, 80)}${editText.length > 80 ? '...' : ''}`;
            break;
         }

         case 'forward':
            previewText = `Переслать ${pluralize(action.messages.length, 'сообщение', 'сообщения', 'сообщений')}`;
            break;
      }
   }

   return (
      <div
         className={`
         overflow-hidden transition-all duration-200
         ${isVisible ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
         <div className="flex items-center justify-between py-1 px-2">
            <div className="textBody text-neutralBlack-600 truncate">
               {previewText}
            </div>
            <button
               className="text-neutralBlack-500 cursor-pointer hover:bg-neutralWhite-400 rounded-full p-1 transition-colors"
               type="button"
               onClick={onClose}
            >
               <X size={20} />
            </button>
         </div>
      </div>
   );
};

export default MessageComposerPreview;
