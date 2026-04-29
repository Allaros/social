import ROUTES from '@/shared/constants/routes';
import HomeImg from '@/public/icons/Home.svg';
import ProfileImg from '@/public/icons/User.svg';
import MessagesImg from '@/public/icons/Send.svg';
import NotificationsImg from '@/public/icons/Notification.svg';
import SearchImg from '@/public/icons/Search.svg';
import { StaticImageData } from 'next/image';

export interface UserLinksInterface {
   imageSrc: StaticImageData;
   alt: string;
   isLink: (slug?: string) => string;
   label?: string;
}

export interface MobileUserLinksInterface {
   image: StaticImageData;
   alt: string;
   href: string;
   label?: string;
}

export const MobileUserLinksData: MobileUserLinksInterface[] = [
   {
      image: HomeImg,
      alt: 'Home link',
      href: ROUTES.home,
   },
   {
      image: SearchImg,
      alt: 'Search',
      href: ROUTES.home,
   },
   {
      image: NotificationsImg,
      alt: 'Notifications link',
      href: ROUTES.home,
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
