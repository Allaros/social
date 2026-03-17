'use client';

import Image from 'next/image';
import Check from '@/public/icons/Check.svg';

const CheckInbox = () => {
   return (
      <>
         <div className="rounded-full p-3.5 bg-success-100 ">
            <Image src={Check} width={20} height={20} alt="Check" />
         </div>
         <h5 className="h5">Проверьте свою почту</h5>
         <p className="textBody text-center text-neutralBlack-500 ">
            Просто проверьте свою электронную почту. На нее должно прийти письмо
            с ссылкой для входа
         </p>
      </>
   );
};

export default CheckInbox;
