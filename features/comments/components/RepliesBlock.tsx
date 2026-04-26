import { useRef, useState } from 'react';
import { useGetReplies } from '../hooks/useGetReplies';
import { AnimatePresence, motion } from 'framer-motion';
import { FramedList } from '@/features/framer-animations/components/AnimatedList/FramedList';
import { FramedItem } from '@/features/framer-animations/components/AnimatedList/FramedItem';
import CommentItem from './CommentItem';
import { useCommentContext } from '../context/commentContext';
import { CommentItemType } from '../types/comments.interface';

const RepliesBlock = ({
   commentId,
   repliesCount,
   previewReplies = [],
   highlightedComment,
   onScrollToComment,
}: {
   commentId: number;
   repliesCount: number;
   highlightedComment: number | null;
   onScrollToComment: (id: number) => void;
   previewReplies?: CommentItemType[];
}) => {
   const [isOpen, setIsOpen] = useState(false);

   const { postAuthorUsername, currentProfile, scrollRef } =
      useCommentContext();

   const repliesRef = useRef<HTMLDivElement | null>(null);

   const query = useGetReplies(commentId, 5, isOpen);

   const replies = query.data
      ? Array.from(
           new Map(
              query.data.pages
                 .flatMap((p) => p.data)
                 .map((item) => [item.id, item])
           ).values()
        )
      : previewReplies;

   const handleToggle = () => {
      const container = scrollRef.current;

      if (isOpen) {
         const height = repliesRef.current?.offsetHeight || 0;

         if (container && height) {
            container.scrollTo({
               top: container.scrollTop - (height + 8),
               behavior: 'smooth',
            });
         }

         setTimeout(() => {
            setIsOpen(false);
         }, 120);
      } else {
         setIsOpen(true);
      }
   };

   return (
      <div>
         <AnimatePresence initial={false}>
            {isOpen && (
               <motion.div
                  ref={repliesRef}
                  key="replies"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-8 py-4 max-md:pl-4"
               >
                  <FramedList preset="replies" layoutMode="items">
                     {replies.map((reply) => (
                        <FramedItem key={reply.id} id={`${reply.id}`}>
                           <CommentItem
                              comment={reply}
                              postAuthorUsername={postAuthorUsername}
                              currentProfileId={currentProfile?.id ?? 0}
                              highlightedComment={highlightedComment}
                              onScrollToComment={onScrollToComment}
                           />
                        </FramedItem>
                     ))}
                  </FramedList>
                  {query.hasNextPage && (
                     <button onClick={() => query.fetchNextPage()}>
                        Load more
                     </button>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
         <div className="flex items-center gap-2 pt-1">
            <div className="h-px bg-neutralWhite-500 flex-1"></div>
            <button
               onClick={handleToggle}
               className="textLabel-medium text-neutralBlack-500 cursor-pointer hover:bg-neutralWhite-400 rounded-sm px-1 py-0.5 "
            >
               {isOpen ? 'Скрыть' : 'Показать'} ответы ({repliesCount})
            </button>
            <div className="h-px bg-neutralWhite-500 flex-1 max-w-6 max-md:max-w-4"></div>
         </div>
      </div>
   );
};

export default RepliesBlock;
