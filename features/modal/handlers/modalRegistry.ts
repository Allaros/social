import { ModalType } from '../constants/modals';
import ChatDeleteModal from '../modals/ChatDeleteModal';
import ConfirmModal from '../modals/ConfirmModal';
import DeleteMessagesModal from '../modals/DeleteMessagesModal';
import MembersToAddModal from '../modals/MembersToAddModal';
import PostEditModal from '../modals/PostEditModal';
import PostSettingsModal from '../modals/PostSettingsModal';
import PreviewModal from '../modals/PreviewModal';
import { ModalPayloadMap } from '../types/modalPayload';

export const modalRegistry: {
   [K in ModalType]: React.ComponentType<{
      payload: ModalPayloadMap[K];
      close: () => void;
   }>;
} = {
   confirm: ConfirmModal,
   preview: PreviewModal,
   postSettings: PostSettingsModal,
   postEdit: PostEditModal,
   messageDelete: DeleteMessagesModal,
   chatDelete: ChatDeleteModal,
   membersToAdd: MembersToAddModal,
};
