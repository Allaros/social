'use client';

import { useEffect, useState } from 'react';

const ResendTimer = ({
   seconds,
   btnFunc,
}: {
   seconds: number;
   btnFunc: () => void;
}) => {
   const [secondsLeft, setSecondsLeft] = useState(seconds);

   useEffect(() => {
      if (secondsLeft <= 0) return;

      const interval = setInterval(() => {
         setSecondsLeft((prev) => {
            if (prev <= 1) {
               clearInterval(interval);
               return 0;
            }
            return prev - 1;
         });
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   const minutes = Math.floor(secondsLeft / 60);
   const secondsVisible = secondsLeft % 60;
   return (
      <div>
         {secondsLeft > 0 ? (
            <p className="textBody text-neutralBlack-500">
               Отправить снова через{' '}
               <span className="textBody-medium text-neutralBlack-900">
                  {minutes}:
                  {secondsVisible >= 10 ? secondsVisible : '0' + secondsVisible}
               </span>
            </p>
         ) : (
            <button
               type="button"
               className="textBody-medium text-neutralBlack-900 cursor-pointer"
               onClick={btnFunc}
            >
               Отправить повторно
            </button>
         )}
      </div>
   );
};

export default ResendTimer;
