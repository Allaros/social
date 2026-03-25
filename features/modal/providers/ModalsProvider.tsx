'use client';

import React, { useEffect, useState } from 'react';
import { modalRegistry } from '../handlers/modalRegistry';
import { ModalContext } from '../context/ModalContext';
import { ModalType } from '../constants/modals';
import { createPortal } from 'react-dom';
import { ModalPayloadMap } from '../types/modalPayload';
import { AnimatePresence } from 'framer-motion';

function renderModal(modal: ModalState, close: () => void) {
   if (modal.type === null) return null;

   const Component = modalRegistry[modal.type];

   return <Component payload={modal.payload as any} close={close} />;
}

type ModalState =
   | { type: null }
   | {
        [K in ModalType]: {
           type: K;
           payload: ModalPayloadMap[K];
        };
     }[ModalType];

const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
   const [modal, setModal] = useState<ModalState>({ type: null });
   const [mounted, setMounted] = useState(false);
   useEffect(() => {
      setMounted(true);
   }, []);

   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         if (e.key === 'Escape') closeModal();
      };

      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
   }, []);

   useEffect(() => {
      if (modal.type !== null) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }
   }, [modal.type]);

   const openModal = <T extends ModalType>(
      type: T,
      payload: ModalPayloadMap[T]
   ) => {
      setModal({ type, payload } as ModalState);
   };

   const closeModal = () => {
      setModal({ type: null });
   };

   const ModalComponent =
      modal.type !== null ? modalRegistry[modal.type] : null;

   return (
      <ModalContext.Provider value={{ openModal, closeModal }}>
         {children}

         {mounted &&
            createPortal(
               <AnimatePresence mode="wait">
                  {renderModal(modal, closeModal)}
               </AnimatePresence>,
               document.body
            )}
      </ModalContext.Provider>
   );
};

export default ModalsProvider;
