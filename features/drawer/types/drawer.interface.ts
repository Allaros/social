import { CommentItemType } from '@/features/comments/types/comments.interface';

// ===== COMMENTS =====

export type ReplyPayload = {
   comment: CommentItemType;
   postId: number;
   postAuthorUsername: string;
};

export type CommentsPayload = {
   postId: number;
   postAuthorUsername: string;
};

export type CommentsScreen =
   | { type: 'comments'; payload: CommentsPayload }
   | { type: 'reply'; payload: ReplyPayload };

export type CommentsUIState = {
   isOpen: boolean;
   screen: CommentsScreen | null;
};

// ===== SEARCH =====

export type SearchUIState = {
   isOpen: boolean;
};
