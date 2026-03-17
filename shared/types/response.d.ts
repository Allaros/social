interface UserResponse {
   id: number;
   email: string;
   isVerified: boolean;
}

interface ProfileResponce {
   name: string;
   username?: string;
   followingCount: number;
   postsCount: number;
   followersCount: number;
   avatarUrl?: string;
   bio?: string;
}

interface MeResponce {
   id: number;
   email: string;
   isVerified: boolean;
   profile: ProfileResponce | null;
}
