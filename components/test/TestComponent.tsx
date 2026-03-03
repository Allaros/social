'use client';

import { useMe } from '@/hooks/auth/useMe';
import Loader from '../common/loader';
import { useLogout } from '@/hooks/auth/useLogout';

const TestComponent = () => {
   const { mutate: logout, isPending } = useLogout();

   if (isPending) return <Loader isPending={isPending} />;
   return (
      <div>
         <button onClick={() => logout()}>Logout</button>
      </div>
   );
};

export default TestComponent;
