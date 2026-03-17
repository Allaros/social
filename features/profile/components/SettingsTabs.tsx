import { useModal } from '@/features/modal/hooks/useModal';
import { SettingsTab } from './cards/SettingsCard';
import { MODALS } from '@/features/modal/constants/modals';
import { ConfirmPayload } from '@/features/modal/types/modalPayload';
import { useLogout } from '@/features/auth/hooks/useLogout';

const SettingsTabs = ({
   changeTab,
}: {
   changeTab: (value: SettingsTab) => void;
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
   const className =
      'px-10 py-2 hover:bg-neutralWhite-400 w-full text-left textBody text-neutralBlack-800 cursor-pointer';
   return (
      <div className="flex flex-col items-start ">
         <button className={className} onClick={() => changeTab('general')}>
            Основные
         </button>
         <button className={className} onClick={() => changeTab('account')}>
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
