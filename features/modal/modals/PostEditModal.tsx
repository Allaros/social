'use client';

import z from 'zod';
import { UpdatePostSchema } from '@/shared/utils/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
} from '@/shared/components/ui/form';
import PostEditor from '@/features/post/components/forms/CreatePost/PostEditor';
import EditMediaField from '../components/EditMediaField';
import { PostEditPayload } from '../types/modalPayload';
import { motion } from 'framer-motion';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { useEditPost } from '@/features/post/hooks/useEditPost';

type Props = {
   close: () => void;
   payload: PostEditPayload;
};

type EditPostFormData = z.infer<typeof UpdatePostSchema>;

const PostEditModal = ({ close, payload }: Props) => {
   const { post, username } = payload;
   const { mutate: editPost, isPending } = useEditPost(username);
   const form = useForm<EditPostFormData>({
      resolver: zodResolver(UpdatePostSchema),
      defaultValues: {
         content: post.content,
         media: [],
         allowComments: post.allowComments,
         visibility: post.visibility,
      },
   });

   useEffect(() => {
      form.reset({
         content: post.content,
         media: post.media.map((m) => ({
            kind: 'existing',
            id: m.id,
            url: m.url,
            type: m.type,
         })),
      });
   }, [post]);

   const onSubmit = (data: EditPostFormData) => {
      const formData = new FormData();

      formData.append('content', data.content);

      const existing = data.media.filter(
         (m): m is Extract<typeof m, { kind: 'existing' }> =>
            m.kind === 'existing'
      );

      const fresh = data.media.filter(
         (m): m is Extract<typeof m, { kind: 'new' }> => m.kind === 'new'
      );
      formData.append('allowComments', data.allowComments ? 'true' : 'false');
      formData.append('visibility', data.visibility);

      formData.append(
         'keepMediaIds',
         JSON.stringify(existing.map((m) => m.id))
      );

      fresh.forEach((m) => {
         formData.append('media', m.file);
      });

      editPost({ postId: post.id, formData: formData });
   };

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
            className="card px-6 mx-4 max-sm:px-2 max-sm:pb-4 max-sm:text-center py-6 relative max-w-125 w-full flex flex-col gap-5"
         >
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 py-6"
               >
                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => (
                        <FormItem className="border border-neutralWhite-400 hover:border-neutralBlack-300 transition-colors rounded-sm">
                           <FormControl>
                              <PostEditor
                                 value={field.value}
                                 onChange={field.onChange}
                                 placeholder="Добавим текст?"
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="media"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <EditMediaField
                                 value={field.value}
                                 onChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <div className="flex items-center gap-4">
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
                           <FormItem className="flex-1">
                              <FormControl className="textBody ">
                                 <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                 >
                                    <SelectTrigger className="cursor-pointer">
                                       <SelectValue placeholder="Выберите видимость" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem
                                          className="cursor-pointer"
                                          value="public"
                                       >
                                          Виден всем
                                       </SelectItem>
                                       <SelectItem
                                          className="cursor-pointer"
                                          value="followers"
                                       >
                                          Только подписчикам
                                       </SelectItem>
                                       <SelectItem
                                          className="cursor-pointer"
                                          value="private"
                                       >
                                          Только мне
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
                  <button
                     type="submit"
                     className="bg-primary-900 hover:bg-primary-800 transition-colors self-end py-1 px-4 rounded-[100px] text-neutralWhite-100 cursor-pointer"
                  >
                     Сохранить
                  </button>
               </form>
            </Form>
         </motion.div>
      </motion.div>
   );
};

export default PostEditModal;
