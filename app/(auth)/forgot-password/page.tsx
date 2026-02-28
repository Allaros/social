'use client';

import DynamicForm, { FieldConfig } from '@/components/forms/DynamicForm';
import { ForgotSchema } from '@/lib/validations';
import React from 'react';

const ForgotPassword = () => {
   return (
      <>
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
            onSubmit={(data) => console.log(data)}
         ></DynamicForm>
      </>
   );
};

export default ForgotPassword;
