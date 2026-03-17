import { ModalType } from '../constants/modals';
import ConfirmModal from '../modals/ConfirmModal';
import { ModalPayloadMap } from '../types/modalPayload';

export const modalRegistry: {
   [K in ModalType]: React.ComponentType<{
      payload: ModalPayloadMap[K];
      close: () => void;
   }>;
} = {
   confirm: ConfirmModal,
};
