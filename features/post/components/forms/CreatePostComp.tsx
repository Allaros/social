'use client';

import { useProfile } from '@/features/profile/hooks/useProfile';
import CreatePostForm from '@/features/post/components/forms/CreatePost';
import AvatarComponent from '@/features/user/components/AvatarComponent';

const CreatePost = () => {
   const profile = useProfile();
   return (
      <div className="bg-neutralWhite-100 border border-neutralWhite-400 rounded-sm py-7 px-7 max-md:px-4 max-md:py-3 flex items-start gap-4">
         <div className="pt-3 max-md:hidden size-10 relative">
            <AvatarComponent
               avatarUrl={profile?.avatarUrl}
               name={profile?.name}
               className="absolute inset-0"
            />
         </div>
         <div className="flex-1">
            <CreatePostForm />
         </div>
      </div>
   );
};

export default CreatePost;
