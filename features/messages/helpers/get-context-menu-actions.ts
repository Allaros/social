import {
   CircleCheck,
   CornerDownRight,
   Copy,
   Forward,
   SquarePen,
   Trash2,
} from 'lucide-react';

import {
   MessageActions,
   MessagePermissions,
} from '../types/messages-actions.types';

type Props = {
   permissions: MessagePermissions;
   actions: MessageActions;
   isSelected: boolean;
   isSelectionMode: boolean;
};

export const getContextMenuActions = ({
   permissions,
   actions,
   isSelected,
   isSelectionMode,
}: Props) => {
   const selectItem = {
      label: isSelected ? 'Снять выделение' : 'Выделить',
      icon: CircleCheck,
      onClick: actions.toggleSelection,
   };

   // Режим выделения + меню открыто на НЕвыделенном сообщении
   if (isSelectionMode && !isSelected) {
      return [selectItem];
   }

   const items = [selectItem];

   // В режиме выделения на выделенном сообщении
   // показываем только действия над выбранными сообщениями
   if (isSelectionMode) {
      if (permissions.canForward) {
         items.push({
            label: 'Переслать выбранное',
            icon: Forward,
            onClick: actions.forwardMessages,
         });
      }

      items.push({
         label: 'Удалить выбранное',
         icon: Trash2,
         onClick: actions.deleteMessages,
      });

      // Если выбрано ровно одно сообщение,
      // разрешаем остальные действия
      if (!permissions.canReply) {
         return items;
      }
   }

   if (permissions.canReply) {
      items.push({
         label: 'Ответить',
         icon: CornerDownRight,
         onClick: actions.replyToMessage,
      });
   }

   if (permissions.canCopy) {
      items.push({
         label: 'Копировать',
         icon: Copy,
         onClick: actions.copyMessages,
      });
   }

   if (permissions.canEdit) {
      items.push({
         label: 'Редактировать',
         icon: SquarePen,
         onClick: actions.editMessage,
      });
   }

   if (!isSelectionMode && permissions.canForward) {
      items.push({
         label: 'Переслать',
         icon: Forward,
         onClick: actions.forwardMessages,
      });
   }

   items.push({
      label: 'Удалить',
      icon: Trash2,
      onClick: actions.deleteMessages,
   });

   return items;
};
