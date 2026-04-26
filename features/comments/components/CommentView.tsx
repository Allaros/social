import React from 'react';
import CommentAuthor from './comment-header/CommentAuthor';
import { CommentItemType } from '../types/comments.interface';
import CommentBody from './comment-main/CommentBody';

const CommentView = ({
   comment,
   postAuthorUsername,
}: {
   comment: CommentItemType;
   postAuthorUsername?: string;
}) => {
   return (
      <div className="p-4 bg-neutralWhite-300 rounded-sm relative">
         <CommentAuthor
            comment={comment}
            postAuthorUsername={postAuthorUsername}
         />

         <CommentBody comment={comment} isDeleted={comment.isDeleted} />
      </div>
   );
};

export default CommentView;
