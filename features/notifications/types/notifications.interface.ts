export type NotificationActorType = {
   id: number;
   username: string;
   name: string;
   avatarUrl?: string;
   createdAt: string;
};

export type NotificationResponse = {
   id: number;
   type: NotificationType;
   isRead: boolean;
   isSeen: boolean;
   createdAt: string;
   actor: NotificationActorType;

   aggregated?: NotificationAggregatedField;

   textPreview?: string;
   imagePreview?: string;
   aggregationType: 'count' | 'actors';
};

export type NotificationAggregatedField = {
   count: number;
   actors: NotificationActorType[];
};

export type NotificationsPage = {
   items: NotificationResponse[];
   nextCursor: string | null;
};

export enum NotificationType {
   FOLLOW = 'follow',
   POST_LIKE = 'post_like',
   COMMENT_LIKE = 'comment_like',
   COMMENT = 'comment',
   REPLY = 'reply',
   REPOST = 'repost',
}

export type NotificationsStateType = {
   type?: 'created' | 'updated' | 'deleted';
   receiverId: number;
   unseenCount: number;
   hasUnseen: boolean;
   notificationIds: number[];
};
