'use client';

import AuthButton from '@/features/auth/components/AuthButton';
import GoogleIco from '@/public/icons/Google.svg';
import MailIco from '@/public/icons/Email.svg';
import { SignInSchema } from '@/shared/utils/validations';
import {
   DynamicForm,
   FieldConfig,
} from '@/features/auth/components/forms/DynamicForm';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { useLogin } from '@/features/auth/hooks/useLogin';
import z from 'zod';

const Auth = () => {
   const { mutate: login, isPending } = useLogin();

   const handleSubmit = (data: z.infer<typeof SignInSchema>) => {
      login(data);
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
            schema={SignInSchema}
            fields={
               [
                  { name: 'email', label: 'Email', type: 'text' },
                  { name: 'password', label: 'Пароль', type: 'password' },
               ] as FieldConfig<typeof SignInSchema>[]
            }
            onSubmit={handleSubmit}
            btnDisabled={isPending}
            btnText="Войти"
            forgetBtn
         />
         <div className="mt-2 texBody text-neutralBlack-600">
            Нет аккаунта?{' '}
            <Link
               href={ROUTES.auth.signUp}
               className="text-neutralBlack-800 textBody-medium"
            >
               Зарегистрироваться
            </Link>
         </div>
      </>
   );
};

export default Auth;
