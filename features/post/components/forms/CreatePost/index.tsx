'use client';

import { useForm } from 'react-hook-form';
import PostEditor from './PostEditor';
import ImageUploader, { MediaItem } from './MediaUploader';
import { useCreatePost } from '@/features/post/hooks/useCreatePost';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostSchema } from '@/shared/utils/validations';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/components/ui/form';
import Image from 'next/image';
import SettingsIco from '@/public/icons/Settings.svg';
import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import z from 'zod';
import { CreatePostFormData } from '@/features/post/types/post.interface';

const allowedTypes = [
   'image/jpeg',
   'image/png',
   'image/webp',
   'video/mp4',
   'video/quicktime',
];

const CreatePostForm = () => {
   const { openModal } = useModal();
   const form = useForm<CreatePostFormData>({
      resolver: zodResolver(CreatePostSchema),
      defaultValues: {
         content: '',
         media: [],
         allowComments: true,
         visibility: 'public',
      },
   });

   const { mutate: createPost, isPending } = useCreatePost();

   const onSubmit = (data: CreatePostFormData) => {
      const formData = new FormData();

      if (data.content.trim().length >= 5) {
         formData.append('content', data.content.trim());
      }

      data.media.forEach((item) => {
         formData.append('media', item.file);
      });

      formData.append('allowComments', String(data.allowComments));
      formData.append('visibility', data.visibility);

      console.log(...formData);

      createPost(formData);
      form.reset();
   };
   return (
      <Form {...form}>
         <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <FormField
               control={form.control}
               name="content"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <PostEditor
                           value={field.value}
                           onChange={field.onChange}
                           placeholder="Что сегодня на уме?"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="relative">
               <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <ImageUploader
                              value={field.value}
                              onChange={field.onChange}
                              allowedTypes={allowedTypes}
                              maxVideoMb={20}
                              maxImageMb={10}
                              maxFiles={10}
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
               <div className="absolute top-0 right-0 z-10 flex items-center gap-2 max-md:top-0.5">
                  <button
                     type="button"
                     onClick={() => openModal(MODALS.POST_SETTINGS, { form })}
                     className="cursor-pointer p-1 hover:bg-neutralWhite-400 transition-colors rounded-full"
                  >
                     <Image
                        src={SettingsIco}
                        alt="settings"
                        width={20}
                        height={20}
                     />
                  </button>
                  <button
                     className="textBody-medium max-md:textLabel-medium bg-primary-800 hover:bg-primary-900 cursor-pointer rounded-[100px] text-neutralWhite-100 px-5 py-1 max-md:px-2 max-md:py-0.5"
                     type="submit"
                     disabled={isPending}
                  >
                     Выложить
                  </button>
               </div>
            </div>
         </form>
      </Form>
   );
};

export default CreatePostForm;
