'use client';

import DynamicForm, { FieldConfig } from '@/components/forms/DynamicForm';
import { ForgotSchema } from '@/lib/validations';

const LoginWithEmail = () => {
   return (
      <>
         <h5 className="h5">Введите Email</h5>
         <p className="textBody text-neutralBlack-500 text-center mb-4">
            На него будет отправлена ссылка для быстрого входа в аккаунт
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

export default LoginWithEmail;
