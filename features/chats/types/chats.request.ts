export type GetMyChatsParams = {
   search?: string;
   archived?: boolean;
   pinned?: boolean;
   cursor?: string;
   limit?: number;
   includedIdentifiers?: string;
};

export type CreateDirectChatPayload = {
   receiverId: number;
};

export type CreateGroupChatPayload = {
   title: string;
   description?: string;
   isPublic?: boolean;
   avatarStorageKey?: string;
   invitedProfilesIds: number[];
};

export type CreateChannelPayload = {
   title: string;
   description?: string;
   isPublic?: boolean;
   avatarStorageKey?: string;
};
