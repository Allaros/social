import { Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { CommentResponse } from '../../types/comments.interface';
import RedactIco from '@/public/icons/Write.svg';
import { useDrawer } from '@/features/drawer/provider/drawerProvider';
import { useCommentContext } from '../../context/commentContext';
import { useCommentLike } from '../../hooks/useCommentLike';

const CommentActions = ({
   comment,
   setEdit,
   onDelete,
   isDeleting,
   authorId,
}: {
   comment: CommentResponse;
   setEdit: () => void;
   onDelete: () => void;
   isDeleting: boolean;
   authorId?: number;
}) => {
   const { openReply } = useDrawer();

   const { postAuthorUsername, postId, currentProfile } = useCommentContext();

   const { mutate: toggleCommentLike, isPending } = useCommentLike();
   return (
      <div className="flex justify-between items-center">
         <div>
            <button
               disabled={isPending}
               onClick={() =>
                  toggleCommentLike({
                     commentId: comment.id,
                     isLiked: comment.isLiked,
                  })
               }
               className="group flex items-center gap-1.5 cursor-pointer"
            >
               <Heart
                  size={18}
                  className={` group-hover:text-red-500 transition-colors ${comment.isLiked ? 'text-red-500' : 'text-neutralBlack-500'}`}
                  fill={comment.isLiked ? '#fb2c36' : 'none'}
               />
               <span className="textLabel transition-colors">
                  {comment.likesCount}
               </span>
            </button>
         </div>
         <div className="flex items-center gap-2 max-md:gap-1">
            {authorId && authorId === comment.author.id && (
               <>
                  <button
                     disabled={isDeleting}
                     onClick={onDelete}
                     className="p-1 rounded-full hover:bg-neutralWhite-500 cursor-pointer"
                  >
                     <Trash2 size={18} className="text-danger-800" />
                  </button>
                  <button
                     onClick={setEdit}
                     className="p-1 hover:bg-neutralWhite-500 cursor-pointer"
                  >
                     <Image
                        src={RedactIco}
                        width={18}
                        height={18}
                        alt="redact comment"
                     />
                  </button>
               </>
            )}
            <button
               onClick={() =>
                  openReply({
                     comment,
                     postAuthorUsername,
                     postId,
                  })
               }
               className="textLabel-medium px-2 py-1 hover:bg-neutralWhite-500 rounded-sm cursor-pointer"
            >
               <span>Ответить</span>
            </button>
         </div>
      </div>
   );
};

export default CommentActions;
