'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import CommentsDrawer from '../components/CommentsDrawer';
import {
   ReplyPayload,
   CommentsUIState,
   CommentsPayload,
} from '../types/drawer.interface';

type ContextType = {
   openComments: (payload: CommentsPayload) => void;
   openReply: (payload: ReplyPayload) => void;
   back: () => void;
   close: () => void;
   state: CommentsUIState;
};

const CommentsUIContext = createContext<ContextType | null>(null);

export const CommentsUIProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [state, setState] = useState<CommentsUIState>({
      isOpen: false,
      screen: null,
   });

   const openComments = (payload: CommentsPayload) => {
      setState({
         isOpen: true,
         screen: { type: 'comments', payload },
      });
   };

   const openReply = (payload: ReplyPayload) => {
      setState((prev) => {
         if (!prev.screen || prev.screen.type !== 'comments') return prev;

         return {
            ...prev,
            screen: { type: 'reply', payload },
         };
      });
   };

   const back = () => {
      setState((prev) => {
         if (!prev.screen) return prev;

         if (prev.screen.type === 'reply') {
            return {
               ...prev,
               screen: {
                  type: 'comments',
                  payload: {
                     postId: prev.screen.payload.postId,
                     postAuthorUsername: prev.screen.payload.postAuthorUsername,
                  },
               },
            };
         }

         return prev;
      });
   };

   const close = () => {
      setState({
         isOpen: false,
         screen: null,
      });
   };

   const value = useMemo(
      () => ({
         openComments,
         openReply,
         back,
         close,
         state,
      }),
      [state]
   );

   return (
      <CommentsUIContext.Provider value={value}>
         {children}

         <CommentsDrawer
            open={state.isOpen}
            screen={state.screen}
            onClose={close}
            onBack={back}
         />
      </CommentsUIContext.Provider>
   );
};

export const useCommentsUI = () => {
   const ctx = useContext(CommentsUIContext);
   if (!ctx) throw new Error('useCommentsUI must be used inside provider');
   return ctx;
};
