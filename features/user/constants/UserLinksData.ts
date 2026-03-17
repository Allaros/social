import ROUTES from '@/shared/constants/routes';
import HomeImg from '@/public/icons/Home.svg';
import ProfileImg from '@/public/icons/User.svg';
import MessagesImg from '@/public/icons/Send.svg';
import NotificationsImg from '@/public/icons/Notification.svg';
import SearchImg from '@/public/icons/Search.svg';
import UnknownImg from '@/public/icons/Incognito.svg';
import { StaticImageData } from 'next/image';

export interface UserLinksInterface {
   imageSrc: StaticImageData;
   alt: string;
   isLink: (slug?: string) => string;
   label?: string;
}

export const MobileUserLinksData: UserLinksInterface[] = [
   {
      imageSrc: HomeImg,
      alt: 'Home link',
      isLink: () => ROUTES.home,
   },
   {
      imageSrc: SearchImg,
      alt: 'Search',
      isLink: () => ROUTES.home,
   },
   {
      imageSrc: NotificationsImg,
      alt: 'Notifications link',
      isLink: () => ROUTES.home,
   },
   {
      imageSrc: UnknownImg,
      alt: 'Profile link',
      isLink: (slug) => ROUTES.main.profile(slug!),
   },
];

export const UserLinksData: UserLinksInterface[] = [
   {
      imageSrc: HomeImg,
      alt: 'Home link',
      isLink: () => ROUTES.home,
      label: 'Главная',
   },
   {
      imageSrc: ProfileImg,
      alt: 'Profile link',
      isLink: (slug) => ROUTES.main.profile(slug!),
      label: 'Профиль',
   },
   {
      imageSrc: MessagesImg,
      alt: 'Messages link',
      isLink: () => ROUTES.home,
      label: 'Сообщения',
   },
   {
      imageSrc: NotificationsImg,
      alt: 'Notifications link',
      isLink: () => ROUTES.home,
      label: 'Уведомления',
   },
];
