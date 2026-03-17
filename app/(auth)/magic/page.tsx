'use client';

import Loader from '@/features/loader/components/Loader';
import { useConfirmMagic } from '@/features/auth/hooks/useConfirmMagic';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const MagicConfirmPage = () => {
   const { mutate: confirmMagic } = useConfirmMagic();
   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   useEffect(() => {
      console.log(token);
      if (token) {
         confirmMagic({ token });
      }
   }, [token]);

   return <Loader visible={true} />;
};

export default MagicConfirmPage;
