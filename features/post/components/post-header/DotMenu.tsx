'use client';
import { useState } from 'react';
import DotsIco from '@/public/icons/More.svg';
import Image from 'next/image';
import { usePostActions } from '../../hooks/usePostActions';
import { useModal } from '@/features/modal/hooks/useModal';
import { ConfirmPayload } from '@/features/modal/types/modalPayload';
import { MODALS } from '@/features/modal/constants/modals';
import { ConfirmTextPayload } from '../../constants/confirmTextPayload';
import { PostResponse } from '../../types/post.responce';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

type PostAction = {
   label: string;
   action: (postId: number) => void;
   visible: boolean;
};

const DotMenu = ({
   post,
   permissions,
}: {
   post: PostResponse;
   permissions: {
      canDelete: boolean;
      canEdit: boolean;
      canReport: boolean;
   };
}) => {
   const { canDelete, canEdit, canReport } = permissions;
   const { openModal } = useModal();
   const { hardDelete, softDelete, toggleSaved } = usePostActions(
      post.author.username
   );

   const confirmHardDeletePayload: ConfirmPayload = {
      onConfirm: () => hardDelete.mutate(post.id),
      ...ConfirmTextPayload.hardDelete,
   };

   const confirmSoftDeletePayload: ConfirmPayload = {
      onConfirm: () => softDelete.mutate(post.id),
      ...ConfirmTextPayload.softDelete,
   };

   const actions: PostAction[] = [
      {
         label: post.isSaved ? 'Удалить из избранного' : 'Сохранить',
         action: () =>
            toggleSaved.mutate({ postId: post.id, isSaved: post.isSaved }),
         visible: true,
      },
      {
         label: 'Редактировать',
         action: () =>
            openModal(MODALS.POST_EDIT, {
               post,
               username: post.author.username,
            }),
         visible: canEdit,
      },
      // {
      //    label: 'Пожаловаться',
      //    action: () => reportPost.mutate(postId),
      //    visible: () => !isAuthor,
      // },
      {
         label: 'Удалить',
         action: () => openModal(MODALS.CONFIRM, confirmSoftDeletePayload),
         visible: canDelete,
      },
      {
         label: 'Удалить навсегда',
         action: () => openModal(MODALS.CONFIRM, confirmHardDeletePayload),
         visible: canDelete,
      },
   ];
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <button className="cursor-pointer hover:bg-neutralWhite-400 transition-colors rounded-[4px] p-1">
               <Image src={DotsIco} alt="post actions" width={24} height={24} />
            </button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end" className="w-48">
            {actions.map((button, i) => {
               if (button.visible) {
                  return (
                     <DropdownMenuItem
                        key={i}
                        onClick={() => button.action(post.id)}
                     >
                        {button.label}
                     </DropdownMenuItem>
                  );
               } else {
                  return null;
               }
            })}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default DotMenu;
