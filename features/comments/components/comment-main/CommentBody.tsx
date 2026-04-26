import React from 'react';
import { CommentItemType } from '../../types/comments.interface';

const CommentBody = ({
   comment,
   isDeleted,
   onMentionClick,
}: {
   comment: CommentItemType;
   isDeleted: boolean;
   onMentionClick?: () => void;
}) => {
   if (isDeleted) {
      return (
         <div className="textBody text-neutralBlack-500 py-4 max-md:pt-2 max-md:pb-3 italic">
            Комментарий удалён
         </div>
      );
   }

   const shouldShowMention =
      comment.replyOnId &&
      comment.replyOnUsername &&
      comment.parentId !== comment.replyOnId;

   return (
      <div className="textBody text-neutralBlack-900 py-4 max-md:pt-2 max-md:pb-3">
         {shouldShowMention && (
            <>
               <span
                  onClick={onMentionClick}
                  className="text-primary-600 cursor-pointer hover:text-primary-800 transition-colors"
               >
                  @{comment.replyOnUsername},
               </span>{' '}
            </>
         )}

         {comment.content}
      </div>
   );
};

export default CommentBody;
