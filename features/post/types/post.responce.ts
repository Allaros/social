export interface PostResponse {
   id: number;
   content: string;
   createdAt: Date;
   isEdited: boolean;
   allowComments: boolean;
   visibility: 'public' | 'followers' | 'private';

   author: PostAuthor;

   media: PostMedia[];

   likesCount: number;
   commentsCount: number;
   repostsCount: number;
   viewsCount: number;

   isLiked: boolean;
   isSaved: boolean;
   isOwned: boolean;
}

export interface PostAuthor {
   id: number;
   username: string;
   name: string;
   avatarUrl?: string;
}

export interface PostMedia {
   id: number;
   url: string;
   type: PostMediaType;
}
