import { useProfile } from '@/features/profile/hooks/useProfile';
import React, { useState } from 'react';
import useGetComments from '../hooks/useGetComments';
import CommentsFeed from './CommentsFeed';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import { CommentContext } from '../context/commentContext';

const CommentShell = ({
   postId,
   authorUsername,
   scrollRef,
}: {
   postId: number;
   authorUsername: string;
   scrollRef: React.RefObject<HTMLDivElement | null>;
}) => {
   const [highlightId, setHighlightId] = useState<number | null>(null);
   const commentsQuery = useGetComments(postId, 3);
   const profile = useProfile();

   const handleScrollToComment = (id: number) => {
      const el = document.getElementById(`comment-${id}`);
      if (!el) return;

      el.scrollIntoView({
         behavior: 'smooth',
         block: 'center',
      });

      setHighlightId(id);

      setTimeout(() => setHighlightId(null), 2000);
   };

   return (
      <CommentContext.Provider
         value={{
            postId,
            postAuthorUsername: authorUsername,
            currentProfile: profile,
            scrollRef,
         }}
      >
         <div className="flex flex-col gap-4">
            <CommentsFeed
               commentsQuery={commentsQuery}
               currentProfileId={profile?.id ?? 0}
               authorUsername={authorUsername}
               highlightedComment={highlightId}
               onScrollToComment={handleScrollToComment}
            />
            <LoadMoreTrigger
               fetchNextPage={commentsQuery.fetchNextPage}
               hasNextPage={commentsQuery.hasNextPage}
               isFetching={commentsQuery.isFetching}
               root={scrollRef.current}
            />
         </div>
      </CommentContext.Provider>
   );
};

export default CommentShell;
