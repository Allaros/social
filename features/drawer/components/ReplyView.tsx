'use client';

import { SheetHeader, SheetTitle } from '@/shared/components/ui/sheet';
import { ReplyPayload } from '../types/drawer.interface';
import CreateCommentForm from '@/features/comments/components/forms/CreateCommentForm';
import CommentView from '@/features/comments/components/CommentView';

const ReplyView = ({
   payload,
   onBack,
}: {
   payload: ReplyPayload;
   onBack: () => void;
}) => {
   return (
      <div className="flex flex-col h-full max-w-3xl mx-auto w-full px-4 gap-4">
         <SheetHeader className="border-b border-neutralWhite-400 pb-2">
            <div className="flex items-center justify-between">
               <SheetTitle>Ответ @{payload.comment.author.username}</SheetTitle>

               <button onClick={onBack}>Назад</button>
            </div>
         </SheetHeader>

         <div className="overflow-auto">
            <CommentView
               comment={payload.comment}
               postAuthorUsername={payload.postAuthorUsername}
            />
         </div>

         <CreateCommentForm
            replyPayload={{
               parentId: payload.comment.parentId ?? payload.comment.id,
               replyOnId: payload.comment.id,
            }}
            postId={payload.postId}
            placeholder="Ваш ответ..."
            sideEffect={onBack}
         />
      </div>
   );
};

export default ReplyView;
