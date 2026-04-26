'use client';

import Image from 'next/image';
import { Eye } from 'lucide-react';
import { useToggleLike } from '../../hooks/useToggleLike';
import { PostResponse } from '../../types/post.responce';
import SendIco from '@/public/icons/Send.svg';

const ActionHeader = ({ post }: { post: PostResponse }) => {
   const { mutate: toggleLike, isPending } = useToggleLike();

   return (
      <div className="flex items-center justify-between w-full textBody-medium text-neutralBlack-500">
         <div className="flex items-center gap-4">
            <button
               className="flex items-center gap-2 hover:bg-neutralWhite-400 p-1 transition-colors cursor-pointer rounded-[4px]"
               onClick={() =>
                  toggleLike({ isLiked: post.isLiked, postId: post.id })
               }
            >
               <svg
                  className={`${post.isLiked ? 'fill-primary-900' : 'fill-transparent'} transition  active:hover:scale-95`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M5.83332 9.16667L9.16666 1.66667C9.8297 1.66667 10.4656 1.93006 10.9344 2.3989C11.4033 2.86775 11.6667 3.50363 11.6667 4.16667V7.5H16.3833C16.6249 7.49727 16.8642 7.54709 17.0846 7.64602C17.3051 7.74495 17.5013 7.89062 17.6599 8.07293C17.8184 8.25525 17.9354 8.46986 18.0028 8.70188C18.0701 8.93391 18.0862 9.1778 18.05 9.41667L16.9 16.9167C16.8397 17.3141 16.6379 17.6763 16.3316 17.9367C16.0253 18.197 15.6353 18.3379 15.2333 18.3333H5.83332M5.83332 9.16667V18.3333M5.83332 9.16667H3.33332C2.8913 9.16667 2.46737 9.34227 2.15481 9.65483C1.84225 9.96739 1.66666 10.3913 1.66666 10.8333V16.6667C1.66666 17.1087 1.84225 17.5326 2.15481 17.8452C2.46737 18.1577 2.8913 18.3333 3.33332 18.3333H5.83332"
                     stroke={`${post.isLiked ? '#858EE1' : '#5D6778'}`}
                     strokeWidth="1.75"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
               <span>{post.likesCount}</span>
            </button>

            <button className="flex items-center gap-2 hover:bg-neutralWhite-400 p-1 transition-colors cursor-pointer rounded-[4px]">
               <Image src={SendIco} width={19} height={19} alt={'repost'} />
               <span>{post.repostsCount}</span>
            </button>
         </div>
         <div>
            <div className="flex items-center gap-2">
               <span>{post.viewsCount}</span>
               <Eye className="text-neutralBlack-500 size-6" />
            </div>
         </div>
      </div>
   );
};

export default ActionHeader;
