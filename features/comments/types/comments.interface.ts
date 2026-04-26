export interface CommentResponse {
   id: number;
   parentId?: number | null;
   replyOnId?: number | null;
   replyOnUsername?: string | null;
   postId: number;
   content: string | null;
   createdAt: string;
   likesCount: number;
   repliesCount: number;
   isDeleted: boolean;
   isLiked: boolean;
   isEdited: boolean;

   author: {
      id: number;
      username: string;
      name: string;
      avatarUrl?: string;
   };
}

export type CommentItemType = CommentResponse & {
   isPending?: boolean;
};

export type CommentsPage = {
   data: CommentResponse[];
   nextCursor: string | null;
   replies: Record<number, CommentResponse[]>;
};
