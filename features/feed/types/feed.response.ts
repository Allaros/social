import { PostResponse } from '@/features/post/types/post.responce';

export interface GetFeedResponse {
   posts: PostResponse[];
   nextCursor: string | null;
}
