import {
   BellIcon,
   LogOutIcon,
   LucideProps,
   Trash2Icon,
   UserIcon,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type ChatButtonVariant = 'default' | 'danger';

export type ChatButton = {
   icon: ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
   >;

   label: string;

   variant: ChatButtonVariant;

   href?: string;

   onClick?: () => void;
};

type ChatButtonsParams = {
   isMuted: boolean;

   profileHref?: string;

   onDeleteChat: () => void;
   onToggleNotifications: () => void;
   onLeaveChat: () => void;
};

export const getChatButtons = (
   chatType: 'direct' | 'group',
   params: ChatButtonsParams
): ChatButton[] => {
   switch (chatType) {
      case 'group':
         return [
            {
               icon: BellIcon,
               label: params.isMuted ? 'Уведомления: выкл' : 'Уведомления: вкл',
               variant: 'default',
               onClick: params.onToggleNotifications,
            },
            {
               icon: LogOutIcon,
               label: 'Покинуть чат',
               variant: 'danger',
               onClick: params.onLeaveChat,
            },
         ];

      default:
         return [
            {
               icon: UserIcon,
               label: 'Профиль',
               variant: 'default',
               href: params.profileHref,
            },
            {
               icon: BellIcon,
               label: params.isMuted ? 'Уведомления: выкл' : 'Уведомления: вкл',
               variant: 'default',
               onClick: params.onToggleNotifications,
            },
            {
               icon: Trash2Icon,
               label: 'Удалить',
               variant: 'danger',
               onClick: params.onDeleteChat,
            },
         ];
   }
};
