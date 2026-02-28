'use client';

import VerifyForm from '@/components/forms/VerifyForm';

const VerifyPage = () => {
   return (
      <>
         <h5 className="h5 text-neutralBlack-900">Введите код верификации</h5>
         <p className="textBody text-neutralBlack-500 mb-4">
            Код отправлен на *****@mail.ru
         </p>
         <VerifyForm />
      </>
   );
};

export default VerifyPage;
