import { useRef } from 'react';

type UseMessageInteractionsProps = {
   isSelectionMode: boolean;

   onSelect: () => void;
};

export const useMessageInteractions = ({
   isSelectionMode,
   onSelect,
}: UseMessageInteractionsProps) => {
   const timerRef = useRef<NodeJS.Timeout | null>(null);

   const longPressTriggeredRef = useRef(false);

   const startLongPress = () => {
      if (isSelectionMode) {
         return;
      }

      longPressTriggeredRef.current = false;

      timerRef.current = setTimeout(() => {
         longPressTriggeredRef.current = true;

         onSelect();
      }, 500);
   };

   const cancelLongPress = () => {
      if (!timerRef.current) {
         return;
      }

      clearTimeout(timerRef.current);

      timerRef.current = null;
   };

   const handleClick = () => {
      if (longPressTriggeredRef.current) {
         longPressTriggeredRef.current = false;

         return;
      }

      if (isSelectionMode) {
         onSelect();
      }
   };

   return {
      onClick: handleClick,

      onMouseDown: startLongPress,
      onMouseUp: cancelLongPress,
      onMouseLeave: cancelLongPress,

      onTouchStart: startLongPress,
      onTouchEnd: cancelLongPress,
      onTouchCancel: cancelLongPress,
   };
};
