import { MODALS } from '@/features/modal/constants/modals';
import { useModal } from '@/features/modal/hooks/useModal';
import { ConfirmPayload } from '@/features/modal/types/modalPayload';

const AccountDelete = () => {
   const { openModal } = useModal();
   const firstModalPayload: ConfirmPayload = {
      onConfirm: () => {
         setTimeout(() => openModal(MODALS.CONFIRM, secondModalPayload), 200);
      },
      title: 'Удаление аккаунта',
      cancelText: 'Отмена',
      confirmText: 'Да, я хочу удалить аккаунт',
      description:
         'Данное действие необратимо и удалит всю информацию об аккаунте, вы уверены что хотите продолжить?',
      variant: 'destructive',
   };
   const secondModalPayload: ConfirmPayload = {
      onConfirm: () => console.log('Аккаунт удален'),
      title: 'Удаление аккаунта',
      cancelText: 'Отмена',
      confirmText: 'Да, я подтверждаю, что хочу удалить аккаунт',
      description:
         'Это последнее предупреждение, после этого вся информация об аккаунте будет удалена',
      variant: 'destructive',
   };
   return (
      <div className="flex flex-col items-start gap-3">
         <div className="h5">Удаление аккаунта</div>
         <div className="textBody">
            Это действие необратимо и оно навсегда удалит всю информацию о вашем
            аккаунте.
         </div>
         <div>
            <button
               onClick={() => openModal(MODALS.CONFIRM, firstModalPayload)}
               className="border mt-3 border-danger-900 py-2 px-6 cursor-pointer hover:bg-danger-900 hover:text-neutralWhite-100 transition-colors rounded-sm textBody-medium text-danger-900 "
            >
               Удалить аккаунт
            </button>
         </div>
      </div>
   );
};

export default AccountDelete;
