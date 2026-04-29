'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import CommentsDrawer from '../components/CommentsDrawer';
import {
   CommentsPayload,
   CommentsUIState,
   ReplyPayload,
   SearchUIState,
} from '../types/drawer.interface';
import SearchDrawer from '../components/SearchDrawer';

type ContextType = {
   // comments
   openComments: (payload: CommentsPayload) => void;
   openReply: (payload: ReplyPayload) => void;
   backComments: () => void;
   closeComments: () => void;

   // search
   openSearch: () => void;
   closeSearch: () => void;
};

const UIContext = createContext<ContextType | null>(null);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
   // ===== COMMENTS =====
   const [comments, setComments] = useState<CommentsUIState>({
      isOpen: false,
      screen: null,
   });

   // ===== SEARCH =====
   const [search, setSearch] = useState<SearchUIState>({
      isOpen: false,
   });

   // ================= COMMENTS =================

   const openComments = (payload: CommentsPayload) => {
      setComments({
         isOpen: true,
         screen: { type: 'comments', payload },
      });
   };

   const openReply = (payload: ReplyPayload) => {
      setComments((prev) => {
         if (!prev.screen || prev.screen.type !== 'comments') return prev;

         return {
            ...prev,
            screen: { type: 'reply', payload },
         };
      });
   };

   const backComments = () => {
      setComments((prev) => {
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

   const closeComments = () => {
      setComments({
         isOpen: false,
         screen: null,
      });
   };

   // ================= SEARCH =================

   const openSearch = () => {
      setSearch({ isOpen: true });
   };

   const closeSearch = () => {
      setSearch({ isOpen: false });
   };

   // ================= VALUE =================

   const value = useMemo(
      () => ({
         openComments,
         openReply,
         backComments,
         closeComments,
         openSearch,
         closeSearch,
      }),
      []
   );

   return (
      <UIContext.Provider value={value}>
         {children}

         <CommentsDrawer
            open={comments.isOpen}
            screen={comments.screen}
            onClose={closeComments}
            onBack={backComments}
         />

         <SearchDrawer open={search.isOpen} onClose={closeSearch} />
      </UIContext.Provider>
   );
};

// ================= HOOK =================

export const useDrawer = () => {
   const ctx = useContext(UIContext);
   if (!ctx) throw new Error('useUI must be used inside UIProvider');
   return ctx;
};
