import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import { formatPostDate } from '@/shared/utils/dating';
import Image from 'next/image';
import React from 'react';
import { CommentResponse } from '../../types/comments.interface';
import UnknownIco from '@/public/icons/Incognito.svg';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';

const CommentAuthor = ({
   comment,
   postAuthorUsername,
}: {
   comment: CommentResponse;
   postAuthorUsername?: string;
}) => {
   return (
      <div className="flex gap-4">
         <Link
            className="flex gap-4 p-1 items-center cursor-pointer hover:bg-neutralWhite-400 rounded-sm flex-2"
            href={ROUTES.main.profile(comment.author.username)}
         >
            <Avatar>
               <AvatarImage
                  src={comment.author.avatarUrl}
                  width={48}
                  height={48}
                  alt="avatar"
                  className="max-w-12 max-h-12 rounded-full"
               />
               <AvatarFallback>
                  <Image
                     src={UnknownIco}
                     width={48}
                     height={48}
                     alt="avatar"
                  ></Image>
               </AvatarFallback>
            </Avatar>
            <div>
               <p className="h6 text-neutralBlack-900 flex items-center gap-2 line-clamp-1">
                  {comment.author.name}{' '}
                  {postAuthorUsername === comment.author.username && (
                     <span className="bg-primary-900 rounded-sm block textLabel-medium px-2 text-neutralWhite-100 ">
                        Автор
                     </span>
                  )}
               </p>
               <p className="textLabel text-neutralBlack-800 line-clamp-1">
                  @{comment.author.username}
               </p>
            </div>
         </Link>
         <div className="self-start flex-1 text-right textLabel text-nowrap text-neutralBlack-500 max-md:absolute max-md:top-2 max-md:right-2">
            <span>{comment.isEdited && '(ред.) '}</span>
            <span>{formatPostDate(comment.createdAt)}</span>
         </div>
      </div>
   );
};

export default CommentAuthor;
