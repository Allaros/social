import { MessageStatusEnum } from '../../types/messages.types';
import { Spinner } from '@/shared/components/ui/spinner';

interface MessageStatusIndicatorProps {
   status: MessageStatusEnum;
   isRead?: boolean;
   isOwn?: boolean;
}

export function MessageStatusIndicator({
   status,
   isOwn = false,
}: MessageStatusIndicatorProps) {
   const isSending = status === MessageStatusEnum.SENDING;
   const isFailed = status === MessageStatusEnum.FAILED;

   const baseColor = isOwn ? 'text-white' : 'text-neutral-black-500';

   const readColor = 'text-success-500';

   const isRead = status === MessageStatusEnum.READ;

   const checkColor = isRead ? readColor : baseColor;

   if (isSending) {
      return <Spinner />;
   }

   if (isFailed) {
      return (
         <div
            className="
              flex items-center justify-center
              h-3.5 w-3.5
              md:h-4.5 md:w-4.5
              rounded-full
              bg-red-500
              text-white
              text-[10px]
              md:text-xs
              leading-none
              font-bold
            "
         >
            !
         </div>
      );
   }

   return (
      <div className="relative h-3.5 w-3.5 md:h-4.5 md:w-4.5">
         <CheckIcon
            className={[
               `
                 absolute
                 inset-0
                 transition-all
                 duration-200
                 ease-out
               `,
               checkColor,
               isRead
                  ? '-translate-x-0.5 opacity-100'
                  : 'translate-x-0 opacity-100',
            ].join(' ')}
         />

         <CheckIcon
            className={[
               `
                 absolute
                 inset-0
                 transition-all
                 duration-200
                 ease-out
               `,
               checkColor,
               isRead
                  ? 'translate-x-0.5 opacity-100'
                  : 'translate-x-0 opacity-0',
            ].join(' ')}
         />
      </div>
   );
}

interface CheckIconProps {
   className?: string;
}

function CheckIcon({ className }: CheckIconProps) {
   return (
      <svg
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="3"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={className}
      >
         <path d="M5 13l4 4L19 7" />
      </svg>
   );
}
