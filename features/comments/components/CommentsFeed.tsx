import { FramedList } from '@/features/framer-animations/components/AnimatedList/FramedList';
import CommentItem from './CommentItem';
import { FramedItem } from '@/features/framer-animations/components/AnimatedList/FramedItem';
import { CommentItemType, CommentsPage } from '../types/comments.interface';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

const CommentsFeed = ({
   commentsQuery,
   authorUsername,
   currentProfileId,
   highlightedComment,
   onScrollToComment,
}: {
   commentsQuery: UseInfiniteQueryResult<
      InfiniteData<CommentsPage, unknown>,
      Error
   >;
   currentProfileId: number;
   authorUsername: string;
   highlightedComment: number | null;
   onScrollToComment: (id: number) => void;
}) => {
   const comments = commentsQuery.data?.pages.flatMap((p) => p.data) ?? [];

   const repliesMap = commentsQuery.data?.pages.reduce(
      (acc, page) => {
         if (!page.replies) return acc;

         Object.entries(page.replies).forEach(([parentId, replies]) => {
            acc[Number(parentId)] = replies;
         });

         return acc;
      },
      {} as Record<number, CommentItemType[]>
   );

   return (
      <FramedList layoutMode="items" preset="comments">
         {comments.map((comment: CommentItemType) => (
            <FramedItem key={comment.id} id={`${comment.id}`}>
               <CommentItem
                  comment={comment}
                  postAuthorUsername={authorUsername}
                  currentProfileId={currentProfileId}
                  previewReplies={repliesMap?.[comment.id] ?? []}
                  highlightedComment={highlightedComment}
                  onScrollToComment={onScrollToComment}
               />
            </FramedItem>
         ))}
      </FramedList>
   );
};

export default CommentsFeed;
