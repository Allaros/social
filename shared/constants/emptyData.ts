import InboxIco from '@/public/icons/Inbox.svg';
import BookmarkIco from '@/public/icons/Bookmark.svg';
import ROUTES from './routes';
import { StaticImageData } from 'next/image';

export type EmptyType = keyof typeof EMPTY;

export type EmptyAction = {
   label: string;
   href?: string;
   onClick?: () => void;
   variant?: 'default' | 'outline' | 'link';
};

export type EmptyDataType = {
   image?: StaticImageData;
   title: string;
   description?: string;
   actions?: EmptyAction[];
};

export const EMPTY = {
   ownProfilePosts: {
      image: InboxIco,
      title: 'У вас пока нет постов',
      description:
         'Вы пока ничего не публиковали. Сделайте первый пост на главной странице.',
      actions: [
         {
            label: 'Перейти на главную',
            href: ROUTES.home,
         },
      ],
   },

   profilePosts: {
      image: InboxIco,
      title: 'Здесь пока ничего нет',
      description: 'Пользователь ещё ничего не публиковал.',
   },

   favourites: {
      image: BookmarkIco,
      title: 'У вас пока нет сохраненных постов',
      description: 'Сохраните пост и пополните коллекцию!',
   },

   emptyFeed: {
      title: 'Странно, кажется постов еще нет...',
      description:
         'Возможно посты пока грузятся. Не переживайте, вы первый узнаете о том, что они загрузились',
   },
};
