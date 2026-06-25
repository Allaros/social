import { GetMyChatsParams } from '@/features/chats/types/chats.request';
import { GetMessagesParams } from '@/features/messages/types/messages.request';

export const searchKeys = {
   all: ['search'] as const,

   results: (params: {
      query: string;
      type: 'profiles' | 'posts';
      page: number;
      limit: number;
   }) => [...searchKeys.all, 'results', params] as const,
};

export const profileKeys = {
   all: ['profiles'] as const,

   detail: (username: string) => [...profileKeys.all, username] as const,
};

export const friendsKeys = {
   all: ['relations'] as const,

   lists: () => [...friendsKeys.all, 'list'] as const,

   list: (params: {
      type: 'friends' | 'followers' | 'following';
      query?: string;
   }) =>
      [
         ...friendsKeys.lists(),
         {
            type: params.type,
            query: params.query ?? '',
         },
      ] as const,
};

export const chatsKeys = {
   all: ['chats'] as const,

   lists: () => [...chatsKeys.all, 'list'] as const,

   list: (params?: Omit<GetMyChatsParams, 'cursor'>) =>
      [
         ...chatsKeys.lists(),

         {
            query: params?.search ?? '',
            archived: params?.archived ?? false,
            pinned: params?.pinned ?? false,
            includedIdentifiers: params?.includedIdentifiers ?? '',
         },
      ] as const,

   details: () => [...chatsKeys.all, 'detail'] as const,

   detail: (identifier?: string | null) =>
      [...chatsKeys.details(), identifier] as const,

   participants: (chatIdentifier: string) => [
      'chat',
      'chat-participants',
      chatIdentifier,
   ],
};

export const messagesKeys = {
   all: ['messages'] as const,
   lists: () => [...messagesKeys.all, 'list'] as const,
   list: (identifier: string, params?: Omit<GetMessagesParams, 'cursor'>) =>
      [
         ...messagesKeys.lists(),
         identifier,
         {
            query: params?.query ?? '',
         },
      ] as const,
};
