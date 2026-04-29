'use client';

import GlobalDropHandler from '@/shared/components/GlobalDropHandler';
import RootHeader from '@/features/feed/components/navigation/RootHeader';
import AuthGuard from '@/features/auth/providers/AuthGuard';
import UserCard from '@/features/user/components/cards/UserCard';
import LinksPanel from '@/features/user/components/navigation/LinksPanel';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <AuthGuard>
         <div className="relative">
            <RootHeader />
            <GlobalDropHandler />
            <div className="grid grid-cols-[3fr_9fr] gap-8 max-[1280px]:gap-4 pt-32 max-md:grid-cols-1 max-md:pt-19 items-start">
               <div className="sticky top-24 self-start max-md:hidden">
                  <UserCard />
               </div>
               {children}
            </div>
            <LinksPanel />
         </div>
      </AuthGuard>
   );
};

export default MainLayout;
