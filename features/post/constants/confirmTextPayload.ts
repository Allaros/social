import { ConfirmPayload } from '@/features/modal/types/modalPayload';

export const ConfirmTextPayload: Record<
   string,
   Omit<ConfirmPayload, 'onConfirm'>
> = {
   hardDelete: {
      title: 'Удалить пост навсегда?',
      confirmText: 'Удалить пост навсегда',
      cancelText: 'Отменить',
      description:
         'Это удалит пост из нашей базы данных без возможности восстановления.',
      variant: 'destructive',
   },
   softDelete: {
      title: 'Удалить пост?',
      confirmText: 'Удалить',
      cancelText: 'Отменить',
      description:
         'Это действие скроет данный пост от всех. Позже вы сможете его восстановить при необходимости.',
      variant: 'destructive',
   },
};
