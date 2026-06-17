import { cn } from '@/shared/lib/utils';
import { CornerDownRight, SquarePen } from 'lucide-react';
import React from 'react';
import { useMessageActions } from '../../hooks/ui/useMessageActions';
import { useMessagesSelectionContext } from '../../providers/MessageSelectionProvider';
import { useMessageComposer } from '../../hooks/ui/useMessageComposer';
import { getMessagePermissions } from '../../helpers/get-message-permissions';

const EditReplyActions = ({
   className,
   chatIdentifier,
}: {
   chatIdentifier: string;
   className?: string;
}) => {
   const { clearSelection, selectedMessages } = useMessagesSelectionContext();
   const composer = useMessageComposer();
   const permissions = getMessagePermissions(selectedMessages);
   const { editMessage, replyToMessage } = useMessageActions({
      chatIdentifier,
      clearSelection,
      composer,
      selectedMessages,
      permissions,
   });

   return (
      <div className={className}>
         <button
            onClick={replyToMessage}
            className="bg-primary-900 cursor-pointer rounded-[100px] justify-center flex-1 px-4 py-2 text-neutralWhite-100 flex items-center gap-2"
         >
            <CornerDownRight size={20} />
            <span>Ответить</span>
         </button>
         <button
            onClick={editMessage}
            className={cn(
               'bg-primary-900 cursor-pointer rounded-[100px] justify-center flex-1 px-4 py-2 text-neutralWhite-100 flex items-center gap-2'
            )}
         >
            <SquarePen size={20} />
            <span>Редактировать</span>
         </button>
      </div>
   );
};

export default EditReplyActions;
