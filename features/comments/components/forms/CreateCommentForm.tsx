'use client';

import { useProfile } from '@/features/profile/hooks/useProfile';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
} from '@/shared/components/ui/form';
import { CreateCommentSchema } from '@/shared/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SendHorizontal } from 'lucide-react';
import useCreateComment from '../../hooks/useCreateComment';
import { ICreateComment } from '../../types/comments.request';
import AvatarComponent from '@/features/user/components/AvatarComponent';

type FormFields = z.infer<typeof CreateCommentSchema>;

type Props = {
   postId: number;
   replyPayload?: {
      parentId: number;
      replyOnId: number;
   };
   placeholder?: string;
   sideEffect?: () => void;
};

const CreateCommentForm = ({
   postId,
   replyPayload,
   placeholder,
   sideEffect,
}: Props) => {
   const profile = useProfile();

   const { mutate: createComment, isPending } = useCreateComment({
      id: profile?.id,
      name: profile?.name,
      username: profile?.username,
      avatarUrl: profile?.avatarUrl,
   });

   const form = useForm<FormFields>({
      resolver: zodResolver(CreateCommentSchema),
      defaultValues: {
         body: '',
      },
   });

   const onSubmit = (data: FormFields) => {
      let body = data.body.trim();

      if (!body) return;

      const payload: ICreateComment = {
         body,
         postId,
      };

      if (replyPayload) {
         payload.parentId = replyPayload.parentId ?? null;
         payload.replyOnId = replyPayload.replyOnId ?? null;
      }

      createComment(payload);

      if (sideEffect) {
         setTimeout(() => {
            sideEffect();
         }, 100);
      }
   };

   const MAX_HEIGHT = 160;

   return (
      <div className="flex items-center gap-6 max-md:gap-2 py-4 max-md:py-2">
         <div className="size-12">
            <AvatarComponent
               avatarUrl={profile?.avatarUrl}
               name={profile?.name}
            ></AvatarComponent>
         </div>
         <Form {...form}>
            <form
               className="flex-1 flex items-end gap-2"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormControl>
                           <textarea
                              placeholder={
                                 placeholder ?? 'Поделитесь своими мыслями...'
                              }
                              className="border w-full rounded-sm px-6 py-2.5 max-md:py-1.5 max-md:px-2 max-md:textLabel placeholder:texLabel resize-none border-neutralWhite-400 focus:border-neutralBlack-300 outline-none overflow-y-auto max-h-[160px]"
                              rows={1}
                              {...field}
                              onInput={(e) => {
                                 const target = e.target as HTMLTextAreaElement;

                                 target.style.height = 'auto';

                                 const scrollHeight = target.scrollHeight;

                                 if (scrollHeight <= MAX_HEIGHT) {
                                    target.style.height = `${scrollHeight}px`;
                                    target.style.overflowY = 'hidden';
                                 } else {
                                    target.style.height = `${MAX_HEIGHT}px`;
                                    target.style.overflowY = 'auto';
                                 }
                              }}
                              onKeyDown={(e) => {
                                 if (
                                    e.key === 'Enter' &&
                                    !e.ctrlKey &&
                                    !e.shiftKey
                                 ) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                 }

                                 if (e.key === 'Enter' && e.ctrlKey) {
                                    e.preventDefault();

                                    const target =
                                       e.target as HTMLTextAreaElement;

                                    const start = target.selectionStart;
                                    const end = target.selectionEnd;

                                    const value = target.value;

                                    target.value =
                                       value.substring(0, start) +
                                       '\n' +
                                       value.substring(end);

                                    target.selectionStart =
                                       target.selectionEnd = start + 1;
                                 }
                              }}
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
               <button
                  disabled={isPending}
                  type="submit"
                  className="text-neutralBlack-500 p-1 mb-1.5 cursor-pointer hover:bg-neutralWhite-400 transition-colors rounded-sm"
               >
                  <SendHorizontal></SendHorizontal>
               </button>
            </form>
         </Form>
      </div>
   );
};

export default CreateCommentForm;
