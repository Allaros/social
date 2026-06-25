'use client';

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/shared/components/ui/dialog';

import { Button } from '@/shared/components/ui/button';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { useUnbanMember } from '../hooks/useUnbanMember';

const UnbanMemberDialog = ({
   children,
   targetId,
}: {
   children: React.ReactNode;
   targetId: number;
}) => {
   const [open, setOpen] = useState(false);

   const { mutate: unbanMember } = useUnbanMember();

   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat');

   const handleConfirm = () => {
      if (!activeIdentifier) {
         toast('Не удалось определить идентификатор чата');
         return;
      }

      console.log('[UNBAN MUTATE]', {
         chatIdentifier: activeIdentifier,
         targetProfileId: targetId,
      });

      unbanMember({
         chatIdentifier: activeIdentifier,
         targetProfileId: targetId,
      });

      setOpen(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Восстановление пользователя</DialogTitle>
            </DialogHeader>

            <div>Вернуть пользователя в чат?</div>

            <DialogFooter>
               <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
               >
                  Отмена
               </Button>

               <Button
                  className="bg-primary-900 text-neutralWhite-100 cursor-pointer textBody rounded-sm hover:bg-primary-800"
                  onClick={handleConfirm}
               >
                  Вернуть
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default UnbanMemberDialog;
