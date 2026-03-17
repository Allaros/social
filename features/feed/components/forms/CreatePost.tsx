'use client';

import { useProfile } from '@/features/profile/hooks/useProfile';
import Image from 'next/image';
import Unknown from '@/public/icons/Incognito.svg';
import CreatePostForm from '@/features/profile/components/forms/CreatePost';

const CreatePost = () => {
   const profile = useProfile();
   return (
      <div className="bg-neutralWhite-100 border border-neutralWhite-400 rounded-sm py-7 px-7 flex items-start gap-4">
         <div className="pt-3">
            <Image
               src={profile?.avatarUrl ?? Unknown}
               alt="User avatar"
               width={40}
               height={40}
               className="rounded-full"
            />
         </div>
         <div className="flex-1">
            <CreatePostForm />
         </div>
      </div>
   );
};

export default CreatePost;
