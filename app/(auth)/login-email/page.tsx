'use client';

import Loader from '@/features/loader/components/Loader';
import DynamicForm, {
   FieldConfig,
} from '@/features/auth/components/forms/DynamicForm';
import { useMagicMail } from '@/features/auth/hooks/useMagicMail';
import { SendEmailSchema } from '@/shared/utils/validations';
import z from 'zod';

const LoginWithEmail = () => {
   const { mutate: sendMail, isPending } = useMagicMail();

   const handleSubmit = (data: z.infer<typeof SendEmailSchema>) => {
      sendMail(data);
   };
   return (
      <>
         <h5 className="h5">Введите Email</h5>
         <p className="textBody text-neutralBlack-500 text-center mb-4">
            На него будет отправлена ссылка для быстрого входа в аккаунт
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

export default LoginWithEmail;
