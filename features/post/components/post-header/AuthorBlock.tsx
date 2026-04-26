import Image from 'next/image';
import { PostResponse } from '../../types/post.responce';
import UnknownImage from '@/public/icons/Incognito.svg';
import { formatPostDate } from '@/shared/utils/dating';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import DotMenu from './DotMenu';
import { Permissions } from '@/features/post/types/post.interface';

const AuthorBlock = ({
   post,
   permissions,
}: {
   permissions: Permissions;
   post: PostResponse;
}) => {
   return (
      <div className="flex justify-between items-center gap-6 border-b border-neutralWhite-400 px-8 pb-6 max-md:px-4 max-md:pb-3">
         <Link
            href={ROUTES.main.profile(post.author.username)}
            className="flex items-center py-0.5 px-0.5 gap-4 flex-2 cursor-pointer hover:bg-neutralWhite-300 transition-colors rounded-sm"
         >
            <Image
               src={post.author.avatarUrl ?? UnknownImage}
               alt="Author picture"
               width={56}
               height={56}
               className="rounded-full"
            />
            <div>
               <div className="h6 text-neutralBlack-900 ">
                  {post.author.name}
               </div>
               <div className="textLabel text-neutralBlack-800">
                  @{post.author.username}
               </div>
            </div>
         </Link>

         <div className="flex flex-col items-end">
            <DotMenu post={post} permissions={permissions} />
            <p className="textLabel text-neutralBlack-400">
               {formatPostDate(post.createdAt)} {post.isEdited && '(ред.)'}{' '}
            </p>
         </div>
      </div>
   );
};

export default AuthorBlock;
