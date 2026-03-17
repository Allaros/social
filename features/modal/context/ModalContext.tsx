'use client';

import { createContext } from 'react';
import { ModalType } from '../constants/modals';
import { ModalPayloadMap } from '../types/modalPayload';

type ModalContextType = {
   openModal: <T extends ModalType>(
      type: T,
      payload: ModalPayloadMap[T]
   ) => void;

   closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
