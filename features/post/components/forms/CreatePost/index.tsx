'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
import PostEditor from './PostEditor';
import ImageUploader, { MediaItem } from './MediaUploader';
import { useCreatePost } from '@/features/post/hooks/useCreatePost';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostSchema } from '@/shared/utils/validations';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/components/ui/form';
import { Button } from '@/shared/components/ui/button';

interface FormData {
   content: string;
   media: MediaItem[];
   allowComments: boolean;
   visibility: 'public' | 'followers' | 'private';
}

const allowedTypes = [
   'image/jpeg',
   'image/png',
   'image/webp',
   'video/mp4',
   'video/quicktime',
];

const CreatePostForm = () => {
   const form = useForm<FormData>({
      resolver: zodResolver(CreatePostSchema),
      defaultValues: {
         content: '',
         media: [],
         allowComments: true,
         visibility: 'public',
      },
   });

   const { mutate: createPost, isPending } = useCreatePost();

   const onSubmit = (data: FormData) => {
      const formData = new FormData();

      if (data.content.trim().length >= 5) {
         formData.append('content', data.content.trim());
      }

      data.media.forEach((item) => {
         formData.append('media', item.file);
      });

      formData.append('allowComments', String(data.allowComments));
      formData.append('visibility', data.visibility);

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
                        />
                     </FormControl>
                  </FormItem>
               )}
            />

            <div className="flex flex-col gap-4">
               <FormField
                  control={form.control}
                  name="allowComments"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <Checkbox
                                 checked={!field.value}
                                 onCheckedChange={(checked) =>
                                    field.onChange(!(checked === true))
                                 }
                                 className="cursor-pointer rounded-[4px]"
                              />
                              <span className="textBody">
                                 Запретить комментарии
                              </span>
                           </label>
                        </FormControl>
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl className="textBody">
                           <Select
                              value={field.value}
                              onValueChange={field.onChange}
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Выберите видимость" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="public">
                                    Виден всем
                                 </SelectItem>
                                 <SelectItem value="followers">
                                    Только подписчикам
                                 </SelectItem>
                                 <SelectItem value="private">
                                    Только мне
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </FormControl>
                     </FormItem>
                  )}
               />
            </div>

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

            <Button
               className="bg-primary-800 hover:bg-primary-900 cursor-pointer"
               type="submit"
               disabled={isPending}
            >
               Post
            </Button>
         </form>
      </Form>
   );
};

export default CreatePostForm;
