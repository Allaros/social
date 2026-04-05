export interface IGetPosts {
   limit?: number;
   cursor?: string | null;
}

export interface IGetProfilePosts {
   targetProfileId: number;
   limit?: number;
   cursor?: string | null;
}
