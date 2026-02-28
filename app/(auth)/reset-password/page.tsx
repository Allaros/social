'use client';

import DynamicForm, { FieldConfig } from '@/components/forms/DynamicForm';
import { ResetPasswordSchema } from '@/lib/validations';

const ResetPassword = () => {
   return (
      <>
         <h5 className="h5">Восстановление пароля</h5>
         <p className="textBody text-neutralBlack-500 text-center mb-4">
            Введите email чтобы сбросить пароль и получить доступ к аккаунту
         </p>
         <DynamicForm
            schema={ResetPasswordSchema}
            fields={
               [
                  { name: 'password', label: 'Новый пароль', type: 'text' },
                  {
                     name: 'confirmPassword',
                     label: 'Подтверждение пароля',
                     type: 'text',
                  },
               ] as FieldConfig<typeof ResetPasswordSchema>[]
            }
            onSubmit={(data) => console.log(data)}
         ></DynamicForm>
      </>
   );
};

export default ResetPassword;
