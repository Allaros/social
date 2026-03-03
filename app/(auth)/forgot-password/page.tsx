'use client';

import Loader from '@/components/common/loader';
import DynamicForm, { FieldConfig } from '@/components/forms/DynamicForm';
import { useSendRecoveryEmail } from '@/hooks/passwordReset/useSendRecoveryMail';
import { ForgotSchema } from '@/lib/validations';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';

const ForgotPassword = () => {
   const { mutate: sendMail, isPending } = useSendRecoveryEmail();

   const handleSubmit = (data: z.infer<typeof ForgotSchema>) => {
      sendMail(data, {
         onError: (err) => {
            toast.success(
               'Если email зарегистрирован, ссылка для сброса пароля отправлена'
            );
         },
         onSuccess: () => {
            toast.success(
               'Если email зарегистрирован, ссылка для сброса пароля отправлена'
            );
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
            schema={ForgotSchema}
            fields={
               [{ name: 'email', label: 'Email', type: 'text' }] as FieldConfig<
                  typeof ForgotSchema
               >[]
            }
            onSubmit={handleSubmit}
         ></DynamicForm>
      </>
   );
};

export default ForgotPassword;
