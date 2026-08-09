'use client';

import Loader from '@/features/loader/components/Loader';
import { useConfirmMagic } from '@/features/auth/hooks/useConfirmMagic';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const MagicConfirmContent = () => {
   const { mutate: confirmMagic } = useConfirmMagic();
   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   useEffect(() => {
      if (token) {
         confirmMagic({ token });
      }
   }, [token, confirmMagic]);

   return <Loader visible={true} />;
};

const MagicConfirmPage = () => {
   return (
      <Suspense fallback={<Loader visible={true} />}>
         <MagicConfirmContent />
      </Suspense>
   );
};

export default MagicConfirmPage;
