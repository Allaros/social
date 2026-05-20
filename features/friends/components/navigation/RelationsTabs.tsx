import React from 'react';
import { RelationType } from '../../types/friends.interface';
import { cn } from '@/shared/lib/utils';

type RelationTabsType = {
   label: string;
   value: RelationType;
};

const relationTabsList: RelationTabsType[] = [
   {
      label: 'Друзья',
      value: 'friends',
   },
   {
      label: 'Подписчики',
      value: 'followers',
   },
   {
      label: 'Подписки',
      value: 'following',
   },
];

const RelationsTabs = ({
   currentTab,
   setTab,
}: {
   setTab: (tab: RelationType) => void;
   currentTab: RelationType;
}) => {
   return (
      <div
         className={cn(
            'flex items-center border-y border-neutralWhite-400',
            '',
            ''
         )}
      >
         {relationTabsList.map((tab) => (
            <button
               onClick={() => setTab(tab.value)}
               className={cn(
                  'flex-1 textBody-medium hover:bg-neutralWhite-400 cursor-pointer transition-colors duration-200',
                  'py-1.5',
                  'md:py-2',
                  `${currentTab === tab.value && 'bg-neutralWhite-400'}`
               )}
               key={tab.value}
            >
               {tab.label}
            </button>
         ))}
      </div>
   );
};

export default RelationsTabs;
