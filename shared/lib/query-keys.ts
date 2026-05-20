import { GetMyChatsParams } from '@/features/chats/types/chats.request';

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

   detail: (identifier: string) =>
      [...chatsKeys.details(), identifier] as const,
};
