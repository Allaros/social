import Image from 'next/image';
import { PostAuthor } from '../types/post.responce';
import UnknownImage from '@/public/icons/Incognito.svg';
import DotMenu from './DotMenu';
import { formatPostDate } from '@/shared/utils/dating';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { Permissions } from '../types/post.interface';
const AuthorBlock = ({
   author,
   createdAt,
   permissions,
   postId,
}: {
   author: PostAuthor;
   createdAt: Date;
   permissions: Permissions;
   postId: number;
}) => {
   return (
      <div className="flex justify-between items-center gap-6 border-b border-neutralWhite-400 px-8 pb-6">
         <Link
            href={ROUTES.main.profile(author.username)}
            className="flex items-center py-0.5 px-0.5 gap-4 flex-2 cursor-pointer hover:bg-neutralWhite-300 transition-colors rounded-sm"
         >
            <Image
               src={author.avatarUrl ?? UnknownImage}
               alt="Author picture"
               width={56}
               height={56}
               className="rounded-full"
            />
            <div>
               <div className="h6 text-neutralBlack-900 ">{author.name}</div>
               <div className="textLabel text-neutralBlack-800">
                  @{author.username}
               </div>
            </div>
         </Link>

         <div className="flex flex-col items-end">
            <DotMenu postId={postId} {...permissions} />
            <p className="textLabel text-neutralBlack-400">
               {formatPostDate(createdAt)}
            </p>
         </div>
      </div>
   );
};

export default AuthorBlock;
