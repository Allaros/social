'use client';

import AuthButton from '@/components/auth/AuthButton';
import GoogleIco from '@/assets/icons/Google.svg';
import MailIco from '@/assets/icons/Email.svg';
import { SignInSchema } from '@/lib/validations';
import { DynamicForm, FieldConfig } from '@/components/forms/DynamicForm';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/auth/useLogin';
import Loader from '@/components/common/loader';
import z from 'zod';
import { handleApiError } from '@/lib/handlers/axiosErrHandling';
import { error } from 'console';
import { AxiosError } from 'axios';

const Auth = () => {
   const router = useRouter();
   const { mutate: login, isPending } = useLogin();

   const handleSubmit = (data: z.infer<typeof SignInSchema>) => {
      login(data, {
         onError: (error: AxiosError<ApiErrorResponse>) => {
            const code = error.response?.data.code;

            if (code === 'EMAIL_NOT_VERIFIED') {
               router.push(ROUTES.auth.verify);
            }

            handleApiError(error);
         },
         onSuccess: () => router.push(ROUTES.home),
      });
   };

   return (
      <>
         <Loader isPending={isPending} />
         <div className="w-full flex flex-col gap-4">
            <AuthButton
               icon={GoogleIco}
               alt="sign in with google"
               width={16}
               height={16}
            >
               Войти через Google
            </AuthButton>
            <AuthButton
               icon={MailIco}
               alt="sign in with email"
               width={16}
               height={16}
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
