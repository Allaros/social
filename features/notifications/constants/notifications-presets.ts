import { NotificationType } from '../types/notifications.interface';

type NotificationPreset = {
   single: string;
   aggregated: string;
};

export const NotificationPresets: Record<NotificationType, NotificationPreset> =
   {
      [NotificationType.FOLLOW]: {
         single: 'подписался(ась) на вас',
         aggregated: 'подписались на вас',
      },

      [NotificationType.POST_LIKE]: {
         single: 'оценил(а) ваш пост',
         aggregated: 'оценили ваш пост',
      },

      [NotificationType.COMMENT_LIKE]: {
         single: 'оценил(а) ваш комментарий',
         aggregated: 'оценили ваш комментарий',
      },

      [NotificationType.COMMENT]: {
         single: 'оставил(а) комментарий под вашим постом',
         aggregated: 'оставили комментарии под вашим постом',
      },

      [NotificationType.REPLY]: {
         single: 'ответил(а) на ваш комментарий',
         aggregated: 'ответили на ваш комментарий',
      },

      [NotificationType.REPOST]: {
         single: 'репостнул(а) ваш пост',
         aggregated: 'репостнули ваш пост',
      },
   };
