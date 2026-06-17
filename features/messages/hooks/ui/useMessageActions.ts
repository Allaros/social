import { toast } from 'sonner';
import { MessageResponseType } from '../../types/messages.types';
import {
   MessageComposerContextType,
   MessageComposerState,
   MessagePermissions,
} from '../../types/messages-actions.types';
import { useHideMessages } from '../queries/useHideMessages';
import { useDeleteMessages } from '../queries/useDeleteMessages';
import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import { useRouter } from 'next/navigation';

type UseMessageActionsProps = {
   chatIdentifier: string;
   selectedMessages: MessageResponseType[];
   clearSelection: () => void;
   currentMessage?: MessageResponseType;
   permissions: MessagePermissions;
   composer: MessageComposerContextType;
};

export const useMessageActions = ({
   chatIdentifier,
   selectedMessages,
   currentMessage,
   permissions,
   composer,
   clearSelection,
}: UseMessageActionsProps) => {
   const { openModal } = useModal();
   const router = useRouter();
   const { mutate: hideMessagesMutation } = useHideMessages();
   const { mutate: deleteMessagesMutation } = useDeleteMessages();
   const targetMessages =
      selectedMessages.length > 0
         ? selectedMessages
         : currentMessage
           ? [currentMessage]
           : [];

   const messageIds = targetMessages.map((message) => message.id);

   const singleMessage =
      targetMessages.length === 1 ? targetMessages[0] : undefined;

   const deleteMessages = () => {
      openModal(MODALS.MESSAGE_DELETE, {
         messagesCount: targetMessages.length,

         canDeleteForEveryone: permissions.canDeleteForEveryone,

         onDeleteForMe: async () => {
            hideMessagesMutation({
               chatIdentifier,
               messageIds,
            });
         },

         onDeleteForEveryone: async () => {
            deleteMessagesMutation({
               chatIdentifier,
               messageIds,
            });
         },
         clearSelection,
      });
   };

   const copyMessages = async () => {
      if (targetMessages.length !== 1) {
         return;
      }

      const text = targetMessages[0].content?.text;

      if (!text) {
         toast('Сообщение не содержит текста');

         return;
      }

      await navigator.clipboard.writeText(text);
      clearSelection();

      toast('Сообщение скопировано');
   };

   const replyToMessage = () => {
      if (!singleMessage) return;

      composer.startReply(singleMessage);
      clearSelection();
   };

   const editMessage = () => {
      if (!singleMessage) return;

      composer.startEdit(singleMessage);
      clearSelection();
   };

   const forwardMessages = () => {
      if (!targetMessages.length) return;

      composer.startForward(targetMessages);

      clearSelection();

      router.push('/chats');
   };

   return {
      deleteMessages,
      copyMessages,
      replyToMessage,
      editMessage,
      forwardMessages,
   };
};
