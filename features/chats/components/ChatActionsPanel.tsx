import { getMessagePermissions } from '@/features/messages/helpers/get-message-permissions';
import { useMessageActions } from '@/features/messages/hooks/ui/useMessageActions';
import { useMessageComposer } from '@/features/messages/hooks/ui/useMessageComposer';
import { useMessagesSelectionContext } from '@/features/messages/providers/MessageSelectionProvider';
import ROUTES from '@/shared/constants/routes';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { cn } from '@/shared/lib/utils';
import { ArrowLeft, Copy, Forward, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const ChatActionsPanel = ({ chatIdentifier }: { chatIdentifier: string }) => {
   const { isSelectionMode, selectedMessages, selectionCount, clearSelection } =
      useMessagesSelectionContext();

   const router = useRouter();

   const permissions = getMessagePermissions(selectedMessages);

   const composer = useMessageComposer();

   const { deleteMessages, forwardMessages, copyMessages } = useMessageActions({
      chatIdentifier,
      selectedMessages,
      permissions,
      clearSelection,
      composer,
   });

   const isMobile = useIsMobile();
   return (
      <div
         className={cn(
            'flex items-center gap-2',
            isMobile &&
               'absolute top-full right-0 w-full h-12 bg-neutralWhite-200 justify-end px-2 gap-4 z-2',
            isSelectionMode ? 'opacity-100' : 'opacity-0'
         )}
      >
         <div
            className={cn(
               isSelectionMode
                  ? 'visible opacity-100 pointer-events-auto'
                  : 'opacity-0 invisible pointer-events-none',
               isMobile ? 'gap-4' : 'gap-2',
               'transition-all duration-200 flex items-center'
            )}
         >
            <button
               onClick={copyMessages}
               className="bg-primary-900 flex items-center gap-1 text-neutralWhite-100 textBody-medium px-2 py-2.5 md:py-1 rounded-sm hover:bg-primary-800 transition-colors duration-200 cursor-pointer"
            >
               {isMobile ? <Copy size={20} /> : 'Копировать'}{' '}
            </button>
            <button
               onClick={forwardMessages}
               className="bg-primary-900 flex items-center gap-1 text-neutralWhite-100 textBody-medium px-2 py-2.5 md:py-1 rounded-sm hover:bg-primary-800 transition-colors duration-200 cursor-pointer"
            >
               {isMobile ? <Forward size={20} /> : 'Переслать'}{' '}
               <span className="text-[14px]/[100%]">{selectionCount}</span>
            </button>
            <button
               onClick={deleteMessages}
               className="bg-primary-900 flex items-center gap-1 text-neutralWhite-100 textBody-medium px-2 py-2.5 md:py-1 rounded-sm hover:bg-primary-800 transition-colors duration-200 cursor-pointer"
            >
               {isMobile ? <Trash2 size={20} /> : 'Удалить'}{' '}
               <span className="text-[14px]/[100%]">{selectionCount}</span>
            </button>
            <button onClick={clearSelection} className="p-2">
               <X />
            </button>
         </div>
      </div>
   );
};

export default ChatActionsPanel;
