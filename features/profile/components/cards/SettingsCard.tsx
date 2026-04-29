'use client';

import { useState } from 'react';
import SettingsTabs from '@/features/profile/components/navigation/SettingsTabs';
import UpdateProfile from '@/features/profile/components/forms/UpdateProfile';
import AccountDelete from '@/features/profile/components/AccountDelete';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { cn } from '@/shared/lib/utils';

export type SettingsTab = 'general' | 'account';

const SettingsCard = ({ username }: { username: string }) => {
   const isMobile = useIsMobile();
   const [currentTab, setCurrentTab] = useState<SettingsTab>('general');
   return (
      <div className="card">
         {!isMobile && (
            <div className="px-10 py-4 border-b border-neutralWhite-400">
               Настройки
            </div>
         )}

         <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-[2fr_7fr]')}>
            <div
               className={cn(
                  'border-neutralWhite-400',
                  'pt-0',
                  'md:pt-10 md:border-r'
               )}
            >
               <SettingsTabs
                  changeTab={setCurrentTab}
                  currentTab={currentTab}
               ></SettingsTabs>
            </div>
            <div className="md:py-10 md:px-14 px-6 py-4">
               {currentTab === 'general' && (
                  <UpdateProfile username={username} />
               )}
               {currentTab === 'account' && <AccountDelete />}
            </div>
         </div>
      </div>
   );
};

export default SettingsCard;
