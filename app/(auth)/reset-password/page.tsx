'use client';

import Loader from '@/components/common/loader';
import DynamicForm, { FieldConfig } from '@/components/forms/DynamicForm';
import ROUTES from '@/constants/routes';
import { useChangePass } from '@/hooks/passwordReset/useChangePass';
import { handleApiError } from '@/lib/handlers/axiosErrHandling';
import { ResetPasswordSchema } from '@/lib/validations';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';

const ResetPassword = () => {
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
      changePass(payload, {
         onError: (err) => {
            handleApiError(err);
         },
         onSuccess: () => {
            toast.success('Пароль успешно изменен');
            router.replace(ROUTES.auth.signIn);
         },
      });
   };

   return (
      <>
         <Loader isPending={isPending} />
         <h5 className="h5">Восстановление пароля</h5>
         <p className="textBody text-neutralBlack-500 text-center mb-4">
            Введите email чтобы сбросить пароль и получить доступ к аккаунту
         </p>
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
         ></DynamicForm>
      </>
   );
};

export default ResetPassword;
