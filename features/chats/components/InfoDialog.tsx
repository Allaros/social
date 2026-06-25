import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTrigger,
} from '@/shared/components/ui/dialog';
import React, { useState } from 'react';
import { ChatDetail } from '../types/chats.types';
import { getChatButtons } from '../constants/chat-buttons';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import Link from 'next/link';
import ROUTES from '@/shared/constants/routes';
import { useToggleMute } from '../hooks/useToggleMute';
import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import { useDeleteDirectChat } from '../hooks/useDeleteDirectChat';
import { useLeaveChat } from '../hooks/useLeaveChat';
import { useDeleteGroupChat } from '../hooks/useDeleteGroupChat';
import { useRouter } from 'next/navigation';
import ChatParticipants from './ChatParticipants';
import { UserPlus } from 'lucide-react';

const InfoDialog = ({
   children,
   chatInfo,
}: {
   children: React.ReactNode;
   chatInfo: ChatDetail;
}) => {
   const isDirect = chatInfo.type === 'direct';

   const activeIdentifier = isDirect ? chatInfo.username : chatInfo.slug;

   const [open, setOpen] = useState(false);

   const router = useRouter();

   const { mutate: deleteDirectChat } = useDeleteDirectChat();
   const { mutate: deleteGroupChat } = useDeleteGroupChat();
   const { mutate: leaveChat } = useLeaveChat();
   const { mutate: toggleMute } = useToggleMute(activeIdentifier!);
   const { openModal } = useModal();

   if (!activeIdentifier) return null;

   const handleDeletion = () => {
      setOpen(false);
      if (isDirect) {
         openModal(MODALS.CHAT_DELETE, {
            onDeleteForEveryone: () => {
               deleteDirectChat({ chatIdentifier: activeIdentifier });
               router.replace(ROUTES.main.chats);
            },
            onDeleteForMe: () => {
               leaveChat(activeIdentifier);
               router.replace(ROUTES.main.chats);
            },
         });
      } else {
         openModal(MODALS.CONFIRM, {
            onConfirm: () => {
               deleteGroupChat({ chatIdentifier: activeIdentifier });
               router.replace(ROUTES.main.chats);
            },
            title: 'Удаление чата',
            confirmText: 'Удалить навсегда',
            cancelText: 'Отмена',
            description:
               'Это удалит все сообщения, а также удалит всех участников. Вы уверены?',
            variant: 'destructive',
         });
      }
   };

   const handleAddMembers = () => {
      openModal(MODALS.MEMBERS_TO_ADD, {
         chatIdentifier: activeIdentifier,
         isOwner: chatInfo.isOwner,
      });

      setOpen(false);
   };

   const chatButtons = getChatButtons(chatInfo.type, {
      isMuted: chatInfo.isMuted,
      onDeleteChat: handleDeletion,
      isOwner: chatInfo.isOwner,
      onLeaveChat: () => leaveChat(activeIdentifier),
      onToggleNotifications: toggleMute,
      profileHref: isDirect
         ? ROUTES.main.profile(chatInfo.username!)
         : undefined,
   });
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger
            className="cursor-pointer hover:bg-neutralWhite-500 transition-colors duration-300 rounded-sm flex-1 p-1"
            asChild
         >
            {children}
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <div className="flex items-center justify-center">
                  <AvatarComponent
                     avatarUrl={chatInfo.avatarUrl}
                     isOnline={isDirect && chatInfo.isOnline}
                     name={chatInfo.name ?? chatInfo.title}
                     className="size-20"
                  />
               </div>
               <div className="text-center">
                  <p className="h5">
                     {isDirect ? chatInfo.name : chatInfo.title}
                  </p>
                  <p className="textLabel text-neutralBlack-500">
                     @{isDirect ? chatInfo.username : chatInfo.slug}
                  </p>
                  {chatInfo.description && (
                     <p className="textBody">{chatInfo.description}</p>
                  )}
               </div>
            </DialogHeader>
            <div className="flex items-stretch gap-2 ">
               {(chatInfo.isPublic || chatInfo.isOwner) && (
                  <button
                     className="bg-primary-100 cursor-pointer hover:bg-primary-200 transition-colors duration-300 gap-1 flex-1 text-center rounded-sm p-2 flex flex-col items-center justify-center"
                     onClick={handleAddMembers}
                  >
                     <UserPlus />
                     <span className="text-[12px]/[110%]">
                        Добавить участников
                     </span>
                  </button>
               )}
               {chatButtons.map((btn) => {
                  const Icon = btn.icon;

                  if (btn.href) {
                     return (
                        <Link
                           className="bg-primary-100 cursor-pointer hover:bg-primary-200 transition-colors duration-300 flex-1 gap-1 text-center rounded-sm p-2 flex flex-col items-center justify-center"
                           key={btn.label}
                           href={btn.href}
                        >
                           <Icon />
                           <span className="textLabel">{btn.label}</span>
                        </Link>
                     );
                  }
                  if (btn.onClick) {
                     return (
                        <button
                           className="bg-primary-100 cursor-pointer hover:bg-primary-200 transition-colors duration-300 gap-1 flex-1 text-center rounded-sm p-2 flex flex-col items-center justify-center"
                           key={btn.label}
                           onClick={btn.onClick}
                        >
                           <Icon />
                           <span className="text-[12px]/[110%]">
                              {btn.label}
                           </span>
                        </button>
                     );
                  }
               })}
            </div>
            <div>
               <ChatParticipants
                  chatIdentifier={activeIdentifier}
                  isOwner={chatInfo.isOwner}
               />
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default InfoDialog;
