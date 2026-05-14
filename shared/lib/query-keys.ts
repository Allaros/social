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
