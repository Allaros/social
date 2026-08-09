'use client';

import { Suspense } from 'react';
import Loader from '@/features/loader/components/Loader';
import DynamicForm, {
   FieldConfig,
} from '@/features/auth/components/forms/DynamicForm';
import ROUTES from '@/shared/constants/routes';
import { useChangePass } from '@/features/auth/hooks/useChangePass';
import { ResetPasswordSchema } from '@/shared/utils/validations';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';

const ResetPasswordContent = () => {
   const router = useRouter();
   const { mutate: changePass, isPending } = useChangePass();
   const searchParams = useSearchParams();

   const handleSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
      const token = searchParams.get('recovery');

      if (!token) {
         toast.error('Токен восстановления отсутствует или недействителен');
         router.replace(ROUTES.auth.forgotPass);
         return null;
      }

      const { confirmPassword, password } = data;

      const payload: IChangePass = {
         password,
         token,
      };

      changePass(payload);
   };

   return (
      <>
         Восстановление пароля Введите email чтобы сбросить пароль и получить
         доступ к аккаунту
         <DynamicForm
            schema={ResetPasswordSchema}
            fields={
               [
                  { name: 'password', label: 'Новый пароль', type: 'password' },
                  {
                     name: 'confirmPassword',
                     label: 'Подтверждение пароля',
                     type: 'password',
                  },
               ] as FieldConfig<typeof ResetPasswordSchema>[]
            }
            onSubmit={handleSubmit}
            btnDisabled={isPending}
         />
      </>
   );
};

const ResetPassword = () => {
   return (
      <Suspense fallback={<Loader visible={true} />}>
         <ResetPasswordContent />
      </Suspense>
   );
};

export default ResetPassword;
