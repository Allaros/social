import Image from 'next/image';
import { useLogout } from '@/features/auth/hooks/useLogout';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import { ConfirmPayload } from '@/features/modal/types/modalPayload';

const AccountButtons = ({ className }: { className: string }) => {
   const { openModal } = useModal();
   const { mutate: logout, isPending } = useLogout();

   const confirmPayload: ConfirmPayload = {
      title: 'Вы уверены что хотите выйти из аккаунта?',
      onConfirm: logout,
      description:
         'После этого действия придётся снова авторизоваться, чтобы воспользоваться приложением',
      variant: 'normal',
      confirmText: 'Выйти',
      cancelText: 'Остаться',
   };
   return (
      <div>
         <div className={`${className} flex items-center gap-3`}>
            <button
               onClick={() => openModal(MODALS.CONFIRM, confirmPayload)}
               className="textBody-medium transition text-neutralBlack-800 cursor-pointer hover:bg-neutralWhite-500 rounded-[6px] px-2"
            >
               Выйти из аккаунта
            </button>
            <Link
               href={ROUTES.home}
               className="textBody-medium transition text-neutralBlack-800 cursor-pointer hover:bg-neutralWhite-500 rounded-full p-2"
            >
               <Image
                  src={'/icons/User.svg'}
                  alt="Account"
                  width={20}
                  height={20}
               />
            </Link>
         </div>
      </div>
   );
};

export default AccountButtons;
