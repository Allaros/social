'use client';

import Loader from '@/features/loader/components/Loader';
import DynamicForm, {
   FieldConfig,
} from '@/features/auth/components/forms/DynamicForm';
import { useSendRecoveryEmail } from '@/features/auth/hooks/useSendRecoveryMail';
import { SendEmailSchema } from '@/shared/utils/validations';
import z from 'zod';

const ForgotPassword = () => {
   const { mutate: sendMail, isPending } = useSendRecoveryEmail();

   const handleSubmit = (data: z.infer<typeof SendEmailSchema>) => {
      sendMail(data);
   };

   return (
      <>
         <h5 className="h5">Восстановление пароля</h5>
         <p className="textBody text-neutralBlack-500 text-center mb-4">
            Введите email чтобы сбросить пароль и получить доступ к аккаунту
         </p>
         <DynamicForm
            schema={SendEmailSchema}
            fields={
               [{ name: 'email', label: 'Email', type: 'text' }] as FieldConfig<
                  typeof SendEmailSchema
               >[]
            }
            onSubmit={handleSubmit}
            btnDisabled={isPending}
         ></DynamicForm>
      </>
   );
};

export default ForgotPassword;
