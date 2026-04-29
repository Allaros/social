import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import { ConfirmPayload } from '@/features/modal/types/modalPayload';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { SettingsTab } from '../cards/SettingsCard';
import { cn } from '@/shared/lib/utils';

const SettingsTabs = ({
   changeTab,
   currentTab,
}: {
   changeTab: (value: SettingsTab) => void;
   currentTab: SettingsTab;
}) => {
   const { mutate: logout } = useLogout();
   const { openModal } = useModal();
   const confirmPayload: ConfirmPayload = {
      title: 'Вы уверены что хотите выйти из аккаунта?',
      onConfirm: logout,
      description:
         'После этого действия придётся снова авторизоваться, чтобы воспользоваться приложением',
      variant: 'normal',
      confirmText: 'Выйти',
      cancelText: 'Остаться',
   };
   const className = cn(
      'py-2 hover:bg-neutralWhite-400 textBody text-neutralBlack-800 cursor-pointer',
      'px-0 flex-1 text-center',
      'md:px-10 md:w-full md:text-left'
   );
   return (
      <div
         className={cn(
            'flex transition-colors duration-300',
            'flex-row items-center',
            'md:flex-col md:items-start'
         )}
      >
         <button
            className={`${className} ${currentTab === 'general' && 'bg-neutralWhite-400'}`}
            onClick={() => changeTab('general')}
         >
            Основные
         </button>
         <button
            className={`${className} ${currentTab === 'account' && 'bg-neutralWhite-400'}`}
            onClick={() => changeTab('account')}
         >
            Аккаунт
         </button>
         <button
            className={className}
            onClick={() => openModal(MODALS.CONFIRM, confirmPayload)}
         >
            Выход
         </button>
      </div>
   );
};

export default SettingsTabs;
