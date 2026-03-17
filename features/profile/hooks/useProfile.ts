import { useMe } from '@/features/auth/hooks/useMe';

export const useProfile = () => {
   const { data } = useMe();
   return data?.profile;
};
