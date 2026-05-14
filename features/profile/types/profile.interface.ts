export type ProfileListItem = {
   id: number;
   name: string;
   username: string;
   avatarUrl?: string;
   bio?: string;

   isOwner: boolean;
   isFollowed: boolean;
   isFollower: boolean;
   isOnline: boolean;
};

export type ProfileDetailItem = {
   id: number;
   name: string;
   username: string;
   avatarUrl?: string;
   bio?: string;
   followingCount: number;
   postsCount: number;
   followersCount: number;
   isOwner: boolean;
   isFollowed: boolean;
   isFollower: boolean;
   isOnline: boolean;
};
