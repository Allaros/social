interface ProfileTabsListInterface {
   label: string;
   tab: 'posts' | 'saved-posts' | 'settings';
}

export const ProfileTabsList: ProfileTabsListInterface[] = [
   {
      label: 'Посты',
      tab: 'posts',
   },
   {
      label: 'Избранное',
      tab: 'saved-posts',
   },
   {
      label: 'Настройки',
      tab: 'settings',
   },
];
