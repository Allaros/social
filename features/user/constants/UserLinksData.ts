import ROUTES from '@/shared/constants/routes';
import HomeImg from '@/public/icons/Home.svg';
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
      href: ROUTES.main.notifications,
   },
];
