export interface PostResponce {
   id: number;
   content: string;
   createdAt: Date;
   likesCount: number;
   commentsCount: number;
   viewsCount: string;
   repostsCount: string;
   author: PostAuthor;
   media: PostMedia[];
}

export interface PostAuthor {
   id: number;
   username: string;
   name: string;
   avatarUrl: string;
}

export interface PostMedia {
   id: number;
   url: string;
   type: 'image' | 'video';
}
