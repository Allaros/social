'use client';

import { VerifySchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import ResendTimer from '../auth/ResendTimer';
import { useRouter } from 'next/navigation';
import { useVerify } from '@/hooks/auth/useVerify';
import { handleApiError } from '@/lib/handlers/axiosErrHandling';
import ROUTES from '@/constants/routes';
import { useResend } from '@/hooks/auth/useResend';
import { error } from 'console';

type FormValues = z.infer<typeof VerifySchema>;

const VerifyForm = () => {
   const router = useRouter();
   const { mutate: verify } = useVerify();
   const { mutate: resend } = useResend();
   const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

   const {
      setValue,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<FormValues>({
      resolver: zodResolver(VerifySchema),
      defaultValues: { code: '' },
   });

   const code = watch('code');

   const handleChange = (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return;

      const newCode =
         code.substring(0, index) + value + code.substring(index + 1);

      setValue('code', newCode);

      if (value && index < 3) {
         inputsRef.current[index + 1]?.focus();
      }
   };

   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').trim();

      if (!/^\d{4}$/.test(pasted)) return;

      setValue('code', pasted);

      pasted.split('').forEach((char, i) => {
         if (inputsRef.current[i]) {
            inputsRef.current[i]!.value = char;
         }
      });

      inputsRef.current[3]?.focus();
   };

   const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
   ) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
         inputsRef.current[index - 1]?.focus();
      }
   };

   const onSubmit = (data: FormValues) => {
      verify(data as IVerify, {
         onError: (error) => {
            handleApiError(error, 'Ошибка при верификации');
         },
         onSuccess: () => {
            router.push(ROUTES.home);
         },
      });
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col items-center w-full gap-6"
      >
         <div className="grid grid-cols-4 gap-4 items-center">
            {[0, 1, 2, 3].map((index) => (
               <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={`${errors.code ? 'border-danger-600' : 'border-neutralWhite-500'} max-w-11 h-11 border h4 rounded-sm outline-neutralBlack-300 text-center `}
                  ref={(el) => {
                     inputsRef.current[index] = el;
                  }}
                  value={code[index] || ''}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={(e) => handleKeyDown(e, index)}
               />
            ))}
         </div>
         {errors.code && (
            <p className="text-danger-900 textBody">{errors.code.message}</p>
         )}
         <ResendTimer
            btnFunc={() =>
               resend(undefined, {
                  onSuccess: () => console.log('новый код отправлен'),
                  onError: (error) => {
                     handleApiError(error, 'Ошибка при отправке');
                  },
               })
            }
            seconds={60}
         />

         <button
            type="submit"
            className="bg-neutralBlack-900 hover:bg-neutralBlack-850 transition-colors w-full mt-6 text-neutralWhite-100 textBody-medium py-2.5 rounded-sm cursor-pointer"
         >
            Подтвердить
         </button>
      </form>
   );
};

export default VerifyForm;
