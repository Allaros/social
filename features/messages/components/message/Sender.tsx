import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import React from 'react';
import { MessageSenderProfile } from '../../types/messages.types';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import UnknownImg from '@/public/icons/Incognito.svg';

const Sender = ({
   messageSender,
}: {
   messageSender?: MessageSenderProfile | null;
}) => {
   return (
      <div>
         <Tooltip>
            <TooltipTrigger>
               {messageSender ? (
                  <Link href={ROUTES.main.profile(messageSender?.username)}>
                     <AvatarComponent
                        avatarUrl={messageSender?.avatarUrl}
                        name={messageSender?.name ?? 'Неизвестный'}
                        className="size-10"
                     />
                  </Link>
               ) : (
                  <AvatarComponent
                     avatarUrl={UnknownImg}
                     name={'Неизвестный'}
                     className="size-10"
                  />
               )}
            </TooltipTrigger>
            <TooltipContent>
               {messageSender ? 'Перейти в профиль' : 'Неизвестный'}
            </TooltipContent>
         </Tooltip>
      </div>
   );
};

export default Sender;
