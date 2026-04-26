'use client';

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
import { useEffect, useRef } from 'react';
import ConfirmIco from '@/public/icons/Check.svg';
import CancelIco from '@/public/icons/X.svg';
import Image from 'next/image';
import { CommentResponse } from '../../types/comments.interface';
import { useEditComment } from '../../hooks/useEditComment';

type FormFields = z.infer<typeof CreateCommentSchema>;

const CommentEditForm = ({
   comment,
   onCancel,
}: {
   comment: CommentResponse;
   onCancel: () => void;
}) => {
   const { mutate: editComment, isPending } = useEditComment(comment.postId);

   const textareaRef = useRef<HTMLTextAreaElement | null>(null);

   const form = useForm<FormFields>({
      resolver: zodResolver(CreateCommentSchema),
      defaultValues: {
         body: comment.content ?? '',
      },
   });

   useEffect(() => {
      form.reset({
         body: comment.content ?? '',
      });
   }, [comment.content]);

   useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
         textarea.style.height = 'auto';
         textarea.style.height = textarea.scrollHeight + 'px';
      }
   }, [comment.content, form]);

   useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            onCancel();
         }
      };

      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
   }, [onCancel]);

   const onSubmit = (data: FormFields) => {
      const value = data.body.trim();

      if (!value) return;

      if (value === comment.content) {
         onCancel();
         return;
      }

      editComment(
         { body: value, commentId: comment.id },
         { onSuccess: () => onCancel() }
      );
   };

   const isDisabled = isPending;

   return (
      <div className="flex items-center gap-6 pt-4">
         <Form {...form}>
            <form className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => {
                     const { ref, ...rest } = field;

                     return (
                        <FormItem className="flex-1 mb-2">
                           <FormControl>
                              <textarea
                                 ref={(el) => {
                                    ref(el);
                                    textareaRef.current = el;
                                 }}
                                 {...rest}
                                 className="border w-full rounded-sm px-6 py-2.5 max-md:py-1.5 max-md:px-2 resize-none overflow-hidden border-neutralWhite-500 focus:border-neutralBlack-300 outline-none"
                                 rows={1}
                                 onInput={(e) => {
                                    const target =
                                       e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height =
                                       target.scrollHeight + 'px';
                                 }}
                              />
                           </FormControl>
                        </FormItem>
                     );
                  }}
               />
               <div className="flex items-center justify-between ">
                  <button
                     type="button"
                     onClick={onCancel}
                     className="p-1 cursor-pointer hover:bg-neutralWhite-500 transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Image
                        src={CancelIco}
                        width={18}
                        height={18}
                        alt="Confirm"
                     />
                  </button>
                  <button
                     type="submit"
                     disabled={isDisabled}
                     className="p-1 cursor-pointer hover:bg-neutralWhite-500 transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Image
                        src={ConfirmIco}
                        width={18}
                        height={18}
                        alt="Cancel"
                     />
                  </button>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default CommentEditForm;
