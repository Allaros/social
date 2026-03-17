'use client';

import VerifyForm from '@/features/auth/components/forms/VerifyForm';
import { useQueryClient } from '@tanstack/react-query';

const VerifyPage = () => {
   const queryClient = useQueryClient();
   const email = queryClient.getQueryData<string>(['registration', 'email']);

   return (
      <>
         <h5 className="h5 text-neutralBlack-900">Введите код верификации</h5>
         <p className="textBody text-neutralBlack-500 mb-4">
            Код отправлен на {email ? email : 'вашу почту'}
         </p>
         <VerifyForm />
      </>
   );
};

export default VerifyPage;
