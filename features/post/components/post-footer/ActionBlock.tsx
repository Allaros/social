'use client';

import { useDrawer } from '@/features/drawer/provider/drawerProvider';
import { PostResponse } from '../../types/post.responce';
import ActionHeader from './ActionHeader';
import CommentIco from '@/public/icons/Comment.svg';
import Image from 'next/image';

const ActionBlock = ({ post }: { post: PostResponse }) => {
   const { openComments } = useDrawer();
   return (
      <div className="mt-8 px-8 max-md:px-4 max-md:mt-4">
         <ActionHeader post={post} />
         <button
            onClick={() =>
               openComments({
                  postId: post.id,
                  postAuthorUsername: post.author.username,
               })
            }
            className="cursor-pointer py-2 px-2 textBody-medium text-neutralBlack-500 flex items-center justify-center gap-2 hover:bg-neutralWhite-400 rounded-sm w-full mt-2"
         >
            <Image src={CommentIco} width={20} height={20} alt="Comments" />
            <span>Комментарии ({post.commentsCount})</span>
         </button>
      </div>
   );
};

export default ActionBlock;
