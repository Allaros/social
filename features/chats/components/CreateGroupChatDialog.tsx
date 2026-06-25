'use client';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTrigger,
} from '@/shared/components/ui/dialog';
import React, { useState } from 'react';
import GroupCreationForm from './GroupChatCreationForm/GroupCreationForm';

const CreateGroupChatDialog = ({ children }: { children: React.ReactNode }) => {
   const [open, setOpen] = useState(false);
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>Создание группы</DialogHeader>
            <GroupCreationForm onSuccess={() => setOpen(false)} />
         </DialogContent>
      </Dialog>
   );
};

export default CreateGroupChatDialog;
