import { useQuery } from '@tanstack/react-query';
import { postApi } from '../api/post';

export const useGetAllPosts = () => {
   return useQuery({
      queryKey: ['posts'],
      queryFn: () => postApi.getAll(),
   });
};
