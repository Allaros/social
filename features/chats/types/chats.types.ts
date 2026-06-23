import { MessagesTypeEnum } from '@/features/messages/types/messages.types';
import { InfiniteData } from '@tanstack/react-query';

export interface LastMessagePreview {
   text: string | null;
   senderName: string | null;
   senderAvatarUrl: string | null;
   createdAt: string | null;
   type: MessagesTypeEnum;
}

export interface ChatListItem {
   id: number;
   type: 'direct' | 'group';
   title?: string;
   avatarUrl?: string;
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

export interface ChatDetail {
   id: number;
   type: ChatType;
   membersCount: number;
   isPublic: boolean;
   slug: string | null;

   title: string | null;
   avatarUrl: string | null;

   username: string | null;
   name: string | null;

   lastSeenAt: string | null;

   isOnline: boolean;
   isSelfChat: boolean;
   isMuted: boolean;
   isLeft: boolean;
   canSendMessages: boolean;

   description: string | null;
}

export type ChatType = 'direct' | 'group';
