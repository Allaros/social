'use client';

import ROUTES from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { Check, UserPlus } from 'lucide-react';
import Link from 'next/link';
import SendIco from '@/public/icons/Send.svg';
import Image from 'next/image';
import { useToggleFollow } from '@/features/friends/hooks/useToggleFollow';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/button';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
const ProfileNums = ({
   profile,
   isError,
}: {
   profile?: ProfileResponce;
   isError: boolean;
}) => {
   const isMobile = useIsMobile();
   const { mutate: toggleFollow, isPending } = useToggleFollow();
   if (isError) return <div>Ошибка загрузки профиля</div>;
   if (!profile) return null;

   const nums = [
      {
         label: 'Подписки',
         num: profile.followingCount,
      },
      {
         label: 'Подписчики',
         num: profile.followersCount,
      },
      {
         label: 'Посты',
         num: profile.postsCount,
      },
   ];
   return (
      <div
         className={cn(
            'flex flex-col items-center gap-4 ',
            '',
            'md:justify-between md:flex-row md:w-full',
            'lg:flex-col lg:w-auto'
         )}
      >
         <div className="flex items-center gap-6">
            {nums.map((item, i) => (
               <div key={i} className="text-center">
                  <p className="md:h3 h4 text-neutralBlack-900">{item.num}</p>
                  <p className="textLabel text-neutralBlack-500">
                     {item.label}
                  </p>
               </div>
            ))}
         </div>
         <div className="flex items-stretch max-md:items-center gap-2">
            <Button
               onClick={() =>
                  toggleFollow({
                     profileId: profile.id,
                     isFollowed: profile.isFollowed ?? false,
                  })
               }
               disabled={isPending}
               className={cn(
                  'rounded-sm cursor-pointer bg-primary-900 hover:bg-primary-800 transition-colors duration-200 text-neutralWhite-100',
                  'p-2 h-8',
                  'md:py-1 md:px-2'
               )}
            >
               <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                     key={profile.isFollowed ? 'followed' : 'not-followed'}
                     initial={{ opacity: 0, scale: 0.85, y: 2 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.85, y: -2 }}
                     transition={{
                        duration: 0.16,
                        ease: 'easeOut',
                     }}
                     className="flex items-center justify-center"
                  >
                     {profile.isFollowed ? (
                        <p className="flex items-center gap-1 textBody">
                           {!isMobile && <span>Отписаться</span>}
                           <Check size={18} />
                        </p>
                     ) : (
                        <p className="flex items-center gap-1 textBody">
                           {!isMobile && <span>Подписаться</span>}
                           <UserPlus size={18} />
                        </p>
                     )}
                  </motion.span>
               </AnimatePresence>
            </Button>
            <Link
               className={cn(
                  'flex items-center justify-center rounded-sm border border-neutralWhite-400 hover:bg-neutralWhite-400 transition-colors',
                  'p-1.5',
                  'md:py-1 md:px-2'
               )}
               href={ROUTES.home}
            >
               <p className="flex items-center gap-1 textBody text-neutralBlack-500">
                  {!isMobile && <span>Написать</span>}
                  <Image
                     src={SendIco}
                     width={18}
                     height={18}
                     alt={'send message'}
                  />
               </p>
            </Link>
         </div>
      </div>
   );
};

export default ProfileNums;
