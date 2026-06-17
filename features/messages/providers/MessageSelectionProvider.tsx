'use client';

import { createContext, useContext, useEffect } from 'react';
import { useMessagesSelection } from '../hooks/ui/useMessagesSelection';

type MessageSelectionContextValue = ReturnType<typeof useMessagesSelection>;

const MessagesSelectionContext =
   createContext<MessageSelectionContextValue | null>(null);

export const MessagesSelectionProvider = ({
   chatIdentifier,
   children,
}: {
   chatIdentifier: string | null;
   children: React.ReactNode;
}) => {
   const selection = useMessagesSelection();

   useEffect(() => {
      selection.clearSelection();
   }, [chatIdentifier]);

   return (
      <MessagesSelectionContext.Provider value={selection}>
         {children}
      </MessagesSelectionContext.Provider>
   );
};

export const useMessagesSelectionContext = () => {
   const context = useContext(MessagesSelectionContext);

   if (!context) {
      throw new Error(
         'useMessagesSelectionContext must be used within MessagesSelectionProvider'
      );
   }

   return context;
};
