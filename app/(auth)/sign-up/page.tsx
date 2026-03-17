'use client';

import AuthButton from '@/features/auth/components/AuthButton';
import GoogleIco from '@/public/icons/Google.svg';
import MailIco from '@/public/icons/Email.svg';
import { SignUpSchema } from '@/shared/utils/validations';
import {
   DynamicForm,
   FieldConfig,
} from '@/features/auth/components/forms/DynamicForm';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { useRegister } from '@/features/auth/hooks/useRegister';

import z from 'zod';
import { handleApiError } from '@/shared/handlers/axiosErrHandling';
import Loader from '@/features/loader/components/Loader';

const Auth = () => {
   const { mutate: registrate, isPending } = useRegister();

   const handleSubmit = (data: z.infer<typeof SignUpSchema>) => {
      const { confirmPassword, ...payload } = data;
      registrate(payload as ISignUp, {
         onError: (error) => {
            handleApiError(error, 'Ошибка при регистрации.');
         },
      });
   };

   return (
      <>
         <div className="w-full flex flex-col gap-4">
            <AuthButton
               icon={GoogleIco}
               alt="sign in with google"
               width={16}
               height={16}
               isLink={ROUTES.auth.googleOAuth}
            >
               Войти через Google
            </AuthButton>
            <AuthButton
               icon={MailIco}
               alt="sign in with email"
               width={16}
               height={16}
               isLink={ROUTES.auth.loginWithEmail}
            >
               Войти через email
            </AuthButton>
         </div>
         <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-neutralWhite-400"></div>
            <p className="textLabel-medium text-neutralBlack-500 my-2">OR</p>
            <div className="flex-1 h-px bg-neutralWhite-400"></div>
         </div>
         <DynamicForm
            schema={SignUpSchema}
            fields={
               [
                  { name: 'name', label: 'Имя', type: 'text' },
                  { name: 'email', label: 'Email', type: 'text' },
                  {
                     name: 'username',
                     label: 'Уникальное имя пользователя',
                     type: 'text',
                  },
                  { name: 'password', label: 'Пароль', type: 'password' },
                  {
                     name: 'confirmPassword',
                     label: 'Подтверждение пароля',
                     type: 'password',
                  },
               ] as FieldConfig<typeof SignUpSchema>[]
            }
            onSubmit={handleSubmit}
            btnText="Продолжить"
            btnDisabled={isPending}
         />
         <div className="mt-2 texBody text-neutralBlack-600">
            Есть аккаунт?{' '}
            <Link
               href={ROUTES.auth.signIn}
               className="text-neutralBlack-800 textBody-medium"
            >
               Войти
            </Link>
         </div>
      </>
   );
};

export default Auth;
