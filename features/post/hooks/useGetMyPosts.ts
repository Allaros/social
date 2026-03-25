import { useQuery } from '@tanstack/react-query';
import { postApi } from '../api/post';

export const useGetMyPosts = () => {
   return useQuery({
      queryKey: ['posts', 'my'],
      queryFn: () => postApi.getMyPosts(),
   });
};
