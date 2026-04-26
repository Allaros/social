'use client';

import React, { useState } from 'react';
import { CommentItemType } from '../types/comments.interface';
import CommentAuthor from './comment-header/CommentAuthor';
import CommentEditForm from './forms/CommentEditForm';
import CommentBody from './comment-main/CommentBody';
import CommentActions from './comment-footer/CommentActions';
import { useDeleteComment } from '../hooks/useDeleteComment';
import RepliesBlock from './RepliesBlock';

const CommentItem = ({
   comment,
   postAuthorUsername,
   currentProfileId,
   previewReplies,
   highlightedComment,
   onScrollToComment,
}: {
   comment: CommentItemType;
   postAuthorUsername: string;
   currentProfileId?: number;
   previewReplies?: CommentItemType[];
   highlightedComment: number | null;
   onScrollToComment: (id: number) => void;
}) => {
   const [isEditing, setIsEditing] = useState(false);

   const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment(
      comment.postId
   );

   const isHighlighted = comment.id === highlightedComment;
   const onMentionClick = () => {
      if (comment.replyOnId) {
         onScrollToComment(comment.replyOnId);
      }
   };

   if (comment.isPending) {
      return (
         <div className="bg-neutralWhite-300 py-4 px-6  max-md:px-2 max-md:py-2 rounded-sm opacity-70 ">
            <CommentAuthor
               comment={comment as any}
               postAuthorUsername={postAuthorUsername}
            />

            <CommentBody
               onMentionClick={onMentionClick}
               comment={comment}
               isDeleted={comment.isDeleted}
            />

            <div className="text-sm text-neutralBlack-400">Отправка...</div>
         </div>
      );
   }

   const hasReplies = comment.repliesCount > 0 && !comment.parentId;

   return (
      <div>
         <div
            id={`comment-${comment.id}`}
            className={`${isHighlighted ? 'bg-neutralWhite-500' : 'bg-neutralWhite-300'} transition-colors relative py-4 px-6 max-md:px-2 max-md:pt-5 max-md:pb-2 rounded-sm`}
         >
            <CommentAuthor
               comment={comment}
               postAuthorUsername={postAuthorUsername}
            />
            {isEditing ? (
               <CommentEditForm
                  comment={comment}
                  onCancel={() => setIsEditing(false)}
               />
            ) : (
               <>
                  <CommentBody
                     onMentionClick={onMentionClick}
                     comment={comment}
                     isDeleted={comment.isDeleted}
                  />
                  {!comment.isDeleted && (
                     <CommentActions
                        comment={comment}
                        authorId={currentProfileId}
                        setEdit={() => setIsEditing(true)}
                        onDelete={() =>
                           deleteComment({
                              commentId: comment.id,
                              repliesCount: comment.repliesCount,
                           })
                        }
                        isDeleting={isDeleting}
                     />
                  )}
               </>
            )}
         </div>
         {hasReplies && (
            <RepliesBlock
               commentId={comment.id}
               repliesCount={comment.repliesCount}
               previewReplies={previewReplies}
               highlightedComment={highlightedComment}
               onScrollToComment={onScrollToComment}
            />
         )}
      </div>
   );
};

export default CommentItem;
