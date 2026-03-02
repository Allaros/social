'use client';

import AuthButton from '@/components/auth/AuthButton';
import GoogleIco from '@/assets/icons/Google.svg';
import MailIco from '@/assets/icons/Email.svg';
import { SignUpSchema } from '@/lib/validations';
import { DynamicForm, FieldConfig } from '@/components/forms/DynamicForm';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { useRegister } from '@/hooks/auth/useRegister';

import z from 'zod';
import { handleApiError } from '@/lib/handlers/axiosErrHandling';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Loader from '@/components/common/loader';

const Auth = () => {
   const router = useRouter();
   const queryClient = useQueryClient();
   const { mutate: registrate, isPending } = useRegister();

   const handleSubmit = (data: z.infer<typeof SignUpSchema>) => {
      const { confirmPassword, ...payload } = data;
      registrate(payload as ISignUp, {
         onError: (error) => {
            handleApiError(error, 'Ошибка при регистрации.');
         },
         onSuccess: () => {
            queryClient.setQueryData(['registration', 'email'], payload.email);
            router.push(ROUTES.auth.verify);
         },
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
            schema={SignUpSchema}
            fields={
               [
                  { name: 'name', label: 'Имя', type: 'text' },
                  { name: 'email', label: 'Email', type: 'text' },
                  { name: 'username', label: 'Псевдоним', type: 'text' },
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
