import GridIco from '@/public/icons/Grid.svg';
import BookmarkIco from '@/public/icons/Bookmark.svg';
import SettingsIco from '@/public/icons/Settings.svg';
import { StaticImageData } from 'next/image';

interface ProfileTabsListInterface {
   label: string;
   tab: 'posts' | 'saved-posts' | 'settings';
   mobileIco: StaticImageData | string;
}

export const ProfileTabsList: ProfileTabsListInterface[] = [
   {
      label: 'Посты',
      tab: 'posts',
      mobileIco: GridIco,
   },
   {
      label: 'Избранное',
      tab: 'saved-posts',
      mobileIco: BookmarkIco,
   },
   {
      label: 'Настройки',
      tab: 'settings',
      mobileIco: SettingsIco,
   },
];
