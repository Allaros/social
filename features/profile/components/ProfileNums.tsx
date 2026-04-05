'use client';

import { useGetProfile } from '@/features/profile/hooks/useGetProfile';
import { useParams } from 'next/navigation';
import Loader from '@/features/loader/components/Loader';

const ProfileNums = ({
   profile,
   isError,
}: {
   profile?: ProfileResponce;
   isError: boolean;
}) => {
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
      <div className="flex items-center gap-6">
         {nums.map((item, i) => (
            <div key={i} className="text-center">
               <p className="h3 text-neutralBlack-900">{item.num}</p>
               <p className="textLabel text-neutralBlack-500">{item.label}</p>
            </div>
         ))}
      </div>
   );
};

export default ProfileNums;
