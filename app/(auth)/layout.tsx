'use client';

import AuthHeader from '@/components/auth/AuthHeader';
import { usePathname } from 'next/navigation';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
   const pathname = usePathname();

   return (
      <div>
         <AuthHeader />
         <section className="flex pt-28 max-md:pt-22 justify-center items-center min-h-screen bg-neutralWhite-200 max-md:bg-neutralWhite-100 ">
            <div
               className={`${
                  pathname !== '/sign-in' && pathname !== '/sign-up'
                     ? '-translate-y-[20%]'
                     : ''
               } max-w-100 bg-neutralWhite-100 min-w-1/3 max-lg:min-w-1/2 max-md:w-full mx-2 flex flex-col gap-6 items-center px-8 border-neutralWhite-400 border py-16 max-md:border-none max-md:mx-0 max-md:py-8`}
            >
               {children}
            </div>
         </section>
      </div>
   );
};

export default layout;
