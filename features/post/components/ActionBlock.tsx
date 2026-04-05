'use client';

import { PostResponse } from '../types/post.responce';
import CommentIco from '@/public/icons/Comment.svg';
import { Eye } from 'lucide-react';
import CustomButton from '@/shared/components/CustomButton';

import { useToggleLike } from '../hooks/useToggleLike';

const ActionBlock = ({ post }: { post: PostResponse }) => {
   const { mutate: toggleLike, isPending } = useToggleLike();

   return (
      <div className="mt-8 px-8">
         <div className="flex items-center justify-between textBody-medium text-neutralBlack-500">
            <CustomButton
               className="flex items-center gap-1 hover:bg-neutralWhite-400 cursor-pointer rounded-sm p-1"
               alt="Comment"
               h={20}
               w={20}
               imageSrc={CommentIco}
               buttonFunc={() => console.log('comment')}
               label={`Комментарии (${post.commentsCount})`}
            />

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 hover:bg-neutralWhite-400  rounded-sm p-1">
                  <span className="self-end">{post.likesCount}</span>
                  <button
                     onClick={() =>
                        toggleLike({ postId: post.id, isLiked: post.isLiked })
                     }
                     disabled={isPending}
                     className="cursor-pointer"
                  >
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill={`${post.isLiked ? '#4C68D5' : '#FFFFFF'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition"
                     >
                        <path
                           d="M5.83332 9.16667L9.16666 1.66667C9.8297 1.66667 10.4656 1.93006 10.9344 2.3989C11.4033 2.86775 11.6667 3.50363 11.6667 4.16667V7.5H16.3833C16.6249 7.49727 16.8642 7.54709 17.0846 7.64602C17.3051 7.74495 17.5013 7.89062 17.6599 8.07293C17.8184 8.25525 17.9354 8.46986 18.0028 8.70188C18.0701 8.93391 18.0862 9.1778 18.05 9.41667L16.9 16.9167C16.8397 17.3141 16.6379 17.6763 16.3316 17.9367C16.0253 18.197 15.6353 18.3379 15.2333 18.3333H5.83332M5.83332 9.16667V18.3333M5.83332 9.16667H3.33332C2.8913 9.16667 2.46737 9.34227 2.15481 9.65483C1.84225 9.96739 1.66666 10.3913 1.66666 10.8333V16.6667C1.66666 17.1087 1.84225 17.5326 2.15481 17.8452C2.46737 18.1577 2.8913 18.3333 3.33332 18.3333H5.83332"
                           stroke={`${post.isLiked ? '#A5A9E9' : '#5D6778'}`}
                           strokeWidth="1.75"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </button>
               </div>
               <div className="flex items-center gap-2 ">
                  <span>{post.viewsCount}</span>
                  <Eye className="size-5 text-neutralBlack-500" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ActionBlock;
