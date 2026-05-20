import { InfiniteData } from '@tanstack/react-query';

export interface LastMessagePreview {
   text: string | null;
   senderName: string | null;
   senderAvatarUrl: string | null;
   createdAt: string | null;
}

export interface ChatListItem {
   id: number;

   type: 'direct' | 'group';

   title?: string;

   avatarUrl?: string;

   slug?: string;

   isPublic: boolean;

   unreadCount: number;

   isPinned: boolean;

   isMuted: boolean;

   membersCount: number;

   lastMessageAt: string | null;

   lastMessage: LastMessagePreview | null;

   isOnline: boolean;

   identifier: string;
}

export interface GetChatsResponse {
   data: ChatListItem[];
   nextCursor: string | null;
}

export interface CreateChatResponse {
   id: number;

   type: 'direct' | 'group';

   identifier: string;

   createdAt: string;

   message: string | null;
}

export type ChatsInfiniteData = InfiniteData<GetChatsResponse>;
