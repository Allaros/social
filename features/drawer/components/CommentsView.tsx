import CommentShell from '@/features/comments/components/CommentShell';
import CreateCommentForm from '@/features/comments/components/forms/CreateCommentForm';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useRef } from 'react';

const CommentsView = ({
   postId,
   postAuthorUsername,
}: {
   postId: number;
   postAuthorUsername: string;
}) => {
   const scrollRef = useRef<HTMLDivElement | null>(null);
   return (
      <div className="flex flex-col h-full max-w-7xl px-4 max-md:px-0 w-full mx-auto gap-2">
         <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea
               viewportRef={(node) => {
                  scrollRef.current = node;
               }}
               className="h-full px-4 max-md:px-2"
               data-lenis-prevent
            >
               <CommentShell
                  postId={postId}
                  authorUsername={postAuthorUsername}
                  scrollRef={scrollRef}
               />
            </ScrollArea>
         </div>

         <div className="border-t border-neutralWhite-400 p-4 max-md:p-2">
            <CreateCommentForm postId={postId} />
         </div>
      </div>
   );
};

export default CommentsView;
