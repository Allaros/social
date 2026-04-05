'use client';
import { useState } from 'react';
import DotsIco from '@/public/icons/More.svg';
import Image from 'next/image';
import { usePostActions } from '../hooks/usePostActions';
import { useModal } from '@/features/modal/hooks/useModal';
import { ConfirmPayload } from '@/features/modal/types/modalPayload';
import { MODALS } from '@/features/modal/constants/modals';
import { ConfirmTextPayload } from '../constants/confirmTextPayload';
import { PostResponse } from '../types/post.responce';

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
   const [visible, setVisible] = useState(false);
   const { hardDelete, softDelete, savePost, unsavePost } = usePostActions();

   const confirmHardDeletePayload: ConfirmPayload = {
      onConfirm: () => hardDelete.mutate(post.id),
      ...ConfirmTextPayload.hardDelete,
   };

   const confirmSoftDeletePayload: ConfirmPayload = {
      onConfirm: () => hardDelete.mutate(post.id),
      ...ConfirmTextPayload.hardDelete,
   };

   const actions: PostAction[] = [
      {
         label: 'Сохранить',
         action: () => savePost.mutate(post.id),
         visible: !post.isSaved,
      },
      {
         label: 'Удалить из избранного',
         action: () => unsavePost.mutate(post.id),
         visible: post.isSaved,
      },
      {
         label: 'Редактировать',
         action: () => openModal(MODALS.POST_EDIT, { post }),
         visible: canEdit,
      },
      // {
      //    label: 'Пожаловаться',
      //    action: () => reportPost.mutate(postId),
      //    visible: () => !isAuthor,
      // },
      {
         label: 'Удалить',
         action: () => softDelete.mutate(post.id),
         visible: canDelete,
      },
      {
         label: 'Удалить навсегда',
         action: () => openModal(MODALS.CONFIRM, confirmHardDeletePayload),
         visible: canDelete,
      },
   ];
   return (
      <div className="relative">
         <button
            onClick={() => setVisible(!visible)}
            className="cursor-pointer hover:bg-neutralWhite-400 transition-colors rounded-[2px]"
         >
            <Image
               src={DotsIco}
               alt={'post actions'}
               width={24}
               height={24}
            ></Image>
         </button>
         <div
            className={`absolute top-full right-[50%] card flex flex-col items-start z-20 text-nowrap transition ${visible ? 'opasity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
         >
            {actions.map((button) => {
               if (button.visible) {
                  return (
                     <button
                        key={button.label}
                        onClick={() => button.action(post.id)}
                        className="hover:bg-neutralWhite-400 cursor-pointer px-4 py-2 w-full text-left"
                     >
                        {button.label}
                     </button>
                  );
               }
            })}
         </div>
      </div>
   );
};

export default DotMenu;
