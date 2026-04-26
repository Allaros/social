export interface ICreateComment {
   body: string;
   postId: number;
   parentId?: number;
   replyOnId?: number;
}

export interface IEditComment {
   body: string;
   postId: number;
   commentId: number;
}

export interface IGetComments {
   postOrParentId: number;
   cursor?: string;
   limit?: number;
}
