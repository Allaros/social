'use client';
import { Skeleton } from '@/shared/components/ui/skeleton';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import { cn } from '@/shared/lib/utils';
const ProfileInfo = ({
   profile,
   isError,
   isMobile,
}: {
   profile?: ProfileResponce;
   isError: boolean;
   isMobile: boolean;
}) => {
   if (isError) return <div>Ошибка загрузки профиля</div>;

   return (
      <div className="flex md:flex-row flex-col items-center gap-6">
         <div className="size-20 md:size-24">
            {!profile ? (
               <Skeleton className="h-full w-full rounded-full" />
            ) : (
               <AvatarComponent
                  avatarUrl={profile.avatarUrl}
                  name={profile.name}
               />
            )}
         </div>

         <div>
            <div
               className={cn(
                  'items-center  flex',
                  'h5 flex-col',
                  'md:h4 md:flex-row md:gap-2'
               )}
            >
               {!profile ? (
                  <Skeleton className="md:h-6 h-4 md:w-40 w-30" />
               ) : (
                  profile.name
               )}{' '}
               {!isMobile && (
                  <span className="textBody text-neutralBlack-500">/</span>
               )}{' '}
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
