'use client';

import GlobalDropHandler from '@/shared/components/GlobalDropHandler';
import RootHeader from '@/features/feed/components/navigation/RootHeader';
import AuthGuard from '@/features/auth/providers/AuthGuard';
import UserCard from '@/features/user/components/cards/UserCard';
import LinksPanel from '@/features/user/components/navigation/LinksPanel';
import { WebSocketProvider } from '@/features/websocket/providers/WebSocketProvider';
import { usePathname, useSearchParams } from 'next/navigation';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { cn } from '@/shared/lib/utils';
import { Suspense } from 'react';

const MainLayoutContent = ({ children }: { children: React.ReactNode }) => {
   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat');
   const pathname = usePathname();
   const isMobile = useIsMobile();

   const hideHeader = isMobile && pathname.startsWith('/chats');
   const hidePanel = isMobile && !!activeIdentifier;

   return (
      <AuthGuard>
         <WebSocketProvider>
            <div className="relative">
               <RootHeader hideHeader={hideHeader} />

               <GlobalDropHandler />

               <div
                  className={cn(
                     'grid min-h-screen box-border pb-10 items-start',
                     'grid-cols-[3fr_9fr] pt-32 gap-8',
                     'max-[1280px]:gap-4',
                     'max-lg:grid-cols-[1fr_9fr]',
                     'max-md:grid-cols-1',
                     hideHeader ? 'max-md:pt-0' : 'max-md:pt-19',
                     hidePanel && 'pb-0'
                  )}
               >
                  <div className="sticky top-24 self-start max-md:hidden">
                     <UserCard />
                  </div>

                  {children}
               </div>

               <LinksPanel />
            </div>
         </WebSocketProvider>
      </AuthGuard>
   );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <Suspense fallback={null}>
         <MainLayoutContent>{children}</MainLayoutContent>
      </Suspense>
   );
};

export default MainLayout;
