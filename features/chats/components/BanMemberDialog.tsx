'use client';

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/shared/components/ui/dialog';

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';

import { Button } from '@/shared/components/ui/button';

import React, { useState } from 'react';
import { useKickMember } from '../hooks/useKickMember';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const BanMemberDialog = ({
   children,
   targetId,
}: {
   children: React.ReactNode;
   targetId: number;
}) => {
   const [open, setOpen] = useState(false);

   const { mutate: kickMember } = useKickMember();

   const searchParams = useSearchParams();

   const activeIdentifier = searchParams.get('chat');

   const [duration, setDuration] = useState<string>('permanent');

   const getRestrictedUntil = (duration: string): string | null => {
      if (duration === 'permanent') {
         return null;
      }

      const days = Number(duration);

      const date = new Date();

      date.setDate(date.getDate() + days);

      return date.toISOString();
   };

   const handleConfirm = () => {
      const restrictedUntil = getRestrictedUntil(duration);

      if (!activeIdentifier) {
         toast('Не удалось определить идентификатор чата');
         return;
      }

      kickMember({
         chatIdentifier: activeIdentifier,
         restrictedUntil,
         targetProfileId: targetId,
      });

      setOpen(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Исключить пользователя</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
               <p className="textLabel text-neutralBlack-500">
                  Выберите срок ограничения
               </p>

               <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                     <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                     <SelectItem value="permanent">Навсегда</SelectItem>

                     <SelectItem value="1">На 1 день</SelectItem>

                     <SelectItem value="7">На 7 дней</SelectItem>

                     <SelectItem value="30">На 30 дней</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <DialogFooter>
               <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
               >
                  Отмена
               </Button>

               <Button
                  className="bg-danger-800 text-neutralWhite-100 cursor-pointer textBody rounded-sm hover:bg-danger-600"
                  onClick={handleConfirm}
               >
                  Исключить
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default BanMemberDialog;
