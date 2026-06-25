'use client';

import CloseIco from '@/public/icons/X.svg';
import { motion } from 'framer-motion';
import { MembersToAddPayload } from '../types/modalPayload';
import { useState } from 'react';
import { useGetMembersToAdd } from '@/features/chats/hooks/useGetMembersToAdd';
import { Input } from '@/shared/components/ui/input';
import AvatarComponent from '@/features/user/components/AvatarComponent';
import LoadMoreTrigger from '@/shared/components/LoadMoreTrigger';
import { X } from 'lucide-react';
import { useDebounce } from '@/shared/utils/debounce';
import { MemberChatStatusEnum } from '@/features/chats/types/chats.types';
import { useAddMember } from '@/features/chats/hooks/useAddMember';

interface Props {
   payload: MembersToAddPayload;
   close: () => void;
}

const MembersToAddModal = ({ payload, close }: Props) => {
   const [query, setQuery] = useState('');

   const debouncedQuery = useDebounce(query, 400);

   const { data, fetchNextPage, hasNextPage, isFetching } = useGetMembersToAdd({
      chatIdentifier: payload.chatIdentifier,
      query: debouncedQuery,
   });

   const { mutate: addMember } = useAddMember();

   const profiles = data?.pages.flatMap((page) => page.data) ?? [];

   return (
      <motion.div
         onClick={() => close()}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="fixed top-0 left-0 w-full h-full bg-neutralBlack-900/40 flex items-center justify-center z-50"
      >
         <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="card px-6 mx-4 max-sm:px-2 max-sm:pb-4 max-sm:text-center py-6 relative max-w-125 w-full"
         >
            <button
               onClick={close}
               className="absolute right-4 top-4 cursor-pointer"
            >
               <X size={20} />
            </button>
            <h3 className="h5 py-2">Добавить друзей</h3>
            <Input
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Поиск..."
            />
            <div className="mt-4 flex-1 overflow-y-auto">
               {profiles.map((profile) => (
                  <div
                     key={profile.username}
                     className="flex items-center gap-3 py-2"
                  >
                     <AvatarComponent
                        avatarUrl={profile.avatarUrl}
                        isOnline={profile.isOnline}
                        name={profile.name}
                        className="size-12"
                     />

                     <div className="flex-1">
                        <div className="textBody">{profile.name}</div>
                        <div className="textLabel text-neutralBlack-500">
                           @{profile.username}
                        </div>
                     </div>

                     <button
                        disabled={
                           profile.chatStatus !==
                           MemberChatStatusEnum.NOT_MEMBER
                        }
                        onClick={() =>
                           addMember({
                              chatIdentifier: payload.chatIdentifier,
                              targetProfileId: profile.profileId,
                           })
                        }
                        className="px-3 py-1 rounded-sm textBody cursor-pointer disabled:bg-primary-400 disabled:cursor-default hover:bg-primary-800 bg-primary-900 text-neutralWhite-100"
                     >
                        {profile.chatStatus === MemberChatStatusEnum.MEMBER && (
                           <span>Добавлен</span>
                        )}
                        {profile.chatStatus ===
                           MemberChatStatusEnum.NOT_MEMBER && (
                           <span>Добавить</span>
                        )}
                        {profile.chatStatus ===
                           MemberChatStatusEnum.RESTRICTED && (
                           <span>Исключен</span>
                        )}
                     </button>
                  </div>
               ))}

               <LoadMoreTrigger
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetching={isFetching}
               />
            </div>
         </motion.div>
      </motion.div>
   );
};

export default MembersToAddModal;
