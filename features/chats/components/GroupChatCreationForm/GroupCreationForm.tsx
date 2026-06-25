import { createGroupChatSchema } from '@/shared/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useAvatarUpload } from '../../hooks/useUploadAvatar';
import { ChatAvatarUpload } from './ChatAvatarUpload';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
} from '@/shared/components/ui/form';
import Checkbox from '@/shared/components/Checkbox';
import InviteList from './InviteList';
import { useSelectMembers } from '../../hooks/useSelectMembers';
import { useCreateGroup } from '../../hooks/useCreateGroup';

type GroupCreationFormFields = z.infer<typeof createGroupChatSchema>;

const GroupCreationForm = ({ onSuccess }: { onSuccess?: () => void }) => {
   const form = useForm<GroupCreationFormFields>({
      resolver: zodResolver(createGroupChatSchema),
      defaultValues: {
         avatarStorageKey: '',
         description: '',
         invitedProfileIds: [],
         isPublic: true,
         title: '',
      },
   });

   const { mutate: createGroup } = useCreateGroup();

   const { avatar, upload, clear } = useAvatarUpload();

   const invites = useSelectMembers();

   const handleAvatarSelect = async (file: File) => {
      const uploaded = await upload(file);

      if (uploaded) {
         form.setValue('avatarStorageKey', uploaded.storageKey);
      }
   };

   useEffect(() => {
      form.setValue('invitedProfileIds', invites.selectedIds);
   }, [invites.selectedIds, form]);

   const handleAvatarClear = () => {
      clear();

      form.setValue('avatarStorageKey', '');
   };

   const errors = Object.values(form.formState.errors)
      .map((error) => error?.message)
      .filter(Boolean);

   const onSubmit = (data: GroupCreationFormFields) => {
      createGroup(data, {
         onSuccess: () => {
            onSuccess?.();
         },
      });
   };

   return (
      <div>
         <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="flex gap-4 items-center">
                  <ChatAvatarUpload
                     onSelect={handleAvatarSelect}
                     onClear={handleAvatarClear}
                     previewUrl={avatar.previewUrl}
                  />
                  <div className="flex-1 flex flex-col gap-2">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <input
                                    type="text"
                                    placeholder="Название группы..."
                                    className="bg-neutralWhite-400 rounded-sm outline-none p-1 w-full textBody"
                                    {...field}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <textarea
                                    className="bg-neutralWhite-400 rounded-sm outline-none p-1 w-full resize-none textBody"
                                    placeholder="Описание..."
                                    {...field}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="isPublic"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Checkbox
                                    checked={field.value}
                                    {...field}
                                    label="Публичная группа"
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <InviteList
                  selectedIds={invites.selectedIds}
                  onToggle={invites.toggle}
               />
               <div>
                  {errors.length > 0 && (
                     <div className="mt-4 flex flex-col gap-1">
                        {errors.map((error, index) => (
                           <p
                              key={`${error}-${index}`}
                              className="text-sm font-medium text-destructive textLabel text-center"
                           >
                              {error}
                           </p>
                        ))}
                     </div>
                  )}
               </div>
               <div className="flex justify-end">
                  <button
                     type="submit"
                     className="py-1 px-4 mt-4 cursor-pointer bg-primary-900 text-neutralWhite-100 rounded-sm"
                  >
                     Создать
                  </button>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default GroupCreationForm;
