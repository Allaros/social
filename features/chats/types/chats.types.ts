import { MessagesTypeEnum } from '@/features/messages/types/messages.types';
import { InfiniteData } from '@tanstack/react-query';

export interface LastMessagePreview {
   text?: string | null;
   senderName?: string | null;
   senderAvatarUrl?: string | null;
   createdAt: string | Date | null;
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
   isOwner: boolean;

   description: string | null;
}

export type ChatType = 'direct' | 'group';

export type ChatParticipant = {
   memberId: number;
   memberProfileId: number;

   name: string;
   username: string;
   avatarUrl: string | null;

   role: 'owner' | 'admin' | 'member';

   isOnline: boolean;
   lastSeenAt?: string;
   isSelf: boolean;

   leftAt: string;
   restrictedUntil: string;
};

export type GetParticipantsResponse = {
   data: ChatParticipant[];
   nextCursor: string | null;
};

export enum MemberChatStatusEnum {
   MEMBER = 'member',
   RESTRICTED = 'restricted',
   NOT_MEMBER = 'not_member',
}

export type ChatMemberCandidate = {
   profileId: number;

   name: string;

   username: string;

   avatarUrl: string | null;

   isOnline: boolean;

   lastSeenAt: string | null;

   chatStatus: MemberChatStatusEnum;
};

export type GetMembersToAddResponse = {
   data: ChatMemberCandidate[];
   nextCursor: string | null;
};

export type UnreadChatsStateType = {
   unreadMutedChatsCount: number;
   unreadChatsCount: number;
};

export type UnreadChatsStateChangedType = {
   unreadMutedChatsCountDelta: number;
   unreadChatsCountDelta: number;
};

export type ChatStateUpdatedType = {
   chatId: number;
   lastMessagePayload: {
      textPreview: string | null;
      senderName: string | null;
      createdAt: string | null;
      type: MessagesTypeEnum;
   } | null;
   unreadCount: number;
   receiverProfileId: number;
   type: ChatStateUpdateType;
};

export enum ChatStateUpdateType {
   CREATE = 'create',
   DELETE = 'delete',
   EDIT = 'edit',
   READ = 'read',
   HIDE = 'hide',
}
