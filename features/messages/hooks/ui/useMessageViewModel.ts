import { getMessagePermissions } from '../../helpers/get-message-permissions';
import { useMessagesSelectionContext } from '../../providers/MessageSelectionProvider';
import { MessageResponseType } from '../../types/messages.types';
import { useMessageActions } from './useMessageActions';
import { useMessageComposer } from './useMessageComposer';
import { useMessageInteractions } from './useMessageInteractions';

type UseMessageViewModelProps = {
   message: MessageResponseType;
   chatIdentifier: string;
};

export const useMessageViewModel = ({
   message,
   chatIdentifier,
}: UseMessageViewModelProps) => {
   const selection = useMessagesSelectionContext();

   const composer = useMessageComposer();

   const selectedMessages = selection.selectedMessages;

   const targetMessages =
      selectedMessages.length > 0 ? selectedMessages : [message];

   const permissions = getMessagePermissions(targetMessages);

   const actions = useMessageActions({
      chatIdentifier,
      currentMessage: message,
      selectedMessages: selection.selectedMessages,
      clearSelection: selection.clearSelection,
      permissions,
      composer,
   });

   const interactions = useMessageInteractions({
      onSelect: () => selection.toggleSelection(message),
      isSelectionMode: selection.isSelectionMode,
   });

   const isSelected = selection.isSelected(message.id);

   return {
      selection: {
         isSelected,
         isSelectionMode: selection.isSelectionMode,
         selectionCount: selection.selectionCount,
      },

      permissions,
      actions: {
         ...actions,
         toggleSelection: () => selection.toggleSelection(message),
      },

      interactions,

      composer: {
         action: composer.action,
         clearAction: composer.clearAction,
      },
   };
};
