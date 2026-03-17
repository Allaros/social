'use client';

import { useState } from 'react';
import SettingsTabs from '@/features/profile/components/SettingsTabs';
import UpdateProfile from '@/features/profile/components/forms/UpdateProfile';
import AccountDelete from '@/features/profile/components/AccountDelete';

export type SettingsTab = 'general' | 'account';

const SettingsCard = () => {
   const [currentTab, setCurrentTab] = useState<SettingsTab>('general');
   return (
      <div className="card">
         <div className="px-10 py-4 border-b border-neutralWhite-400">
            Настройки
         </div>

         <div className="grid grid-cols-[2fr_7fr]">
            <div className="pt-10 border-r border-neutralWhite-400">
               <SettingsTabs changeTab={setCurrentTab}></SettingsTabs>
            </div>
            <div className="py-10 px-14">
               {currentTab === 'general' && <UpdateProfile />}
               {currentTab === 'account' && <AccountDelete />}
            </div>
         </div>
      </div>
   );
};

export default SettingsCard;
