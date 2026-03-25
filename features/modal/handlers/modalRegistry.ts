import { ModalType } from '../constants/modals';
import ConfirmModal from '../modals/ConfirmModal';
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
};
