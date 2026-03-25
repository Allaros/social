'use client';

import Image from 'next/image';
import UnknownImg from '@/public/icons/Incognito.svg';
import { Skeleton } from '@/shared/components/ui/skeleton';
const ProfileInfo = ({
   profile,
   isError,
}: {
   profile?: ProfileResponce;
   isError: boolean;
}) => {
   if (isError) return <div>Ошибка загрузки профиля</div>;

   return (
      <div className="flex items-center gap-6">
         <div className="h-24 w-24">
            {!profile ? (
               <Skeleton className="h-full w-full rounded-full" />
            ) : (
               <Image
                  src={profile.avatarUrl ?? UnknownImg}
                  width={96}
                  height={96}
                  alt={'Profile Image'}
                  className="rounded-full"
               ></Image>
            )}
         </div>

         <div>
            <div className="h4 flex items-center gap-2">
               {!profile ? <Skeleton className="h-6 w-40" /> : profile.name}{' '}
               <span className="textBody text-neutralBlack-500">/</span>{' '}
               <span className="textLabel text-neutralBlack-500">
                  {!profile ? (
                     <Skeleton className="h-4 w-40" />
                  ) : (
                     `@${profile.username}`
                  )}
               </span>
            </div>
            <div className="mt-2 textLabel text-neutralBlack-400">
               {!profile ? <Skeleton className="h-3.5 w-30" /> : profile.bio}
            </div>
         </div>
      </div>
   );
};

export default ProfileInfo;
