'use client';

import { UpdateProfileSchema } from '@/shared/utils/validations';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/shared/components/ui/form';
import ImageUploader from './CreatePost/ImageUploader';
import { useState } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import UploadIco from '@/public/icons/Upload.svg';

type FormValues = z.infer<typeof UpdateProfileSchema>;
type TextField = Exclude<keyof FormValues, 'image'>;

const textFields: TextField[] = ['name', 'username', 'bio'];

const textPlaceholders: Record<TextField, string> = {
   name: 'Ваше имя',
   username: 'Имя пользователя',
   bio: 'Ваш статус',
};

const UpdateProfile = () => {
   const [images, setImages] = useState<File[]>([]);
   const form = useForm<FormValues>({
      resolver: zodResolver(UpdateProfileSchema),
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
   });

   const onSubmit = (data: FormValues) => {
      console.log(data);
      const payload = {
         ...data,
         image: images[0],
      };

      console.log(payload);
   };

   return (
      <Form {...form}>
         <form
            className="flex flex-col gap-6 items-start "
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <FormField
               control={form.control}
               name="image"
               render={({ field }) => (
                  <FormItem className="min-w-[50%]">
                     <FormControl>
                        <ImageUploader
                           text="Выберите изображение профиля"
                           icon={UploadIco}
                           maxImages={1}
                           maxSizeMb={10}
                           className="border-2 border-dashed border-neutralWhite-400 py-3 px-5 text-neutralBlack-600 textBody"
                           images={field.value ? [field.value] : []}
                           onChange={(files) => field.onChange(files[0])}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            {textFields.map((name) => (
               <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                     <FormItem className="min-w-[50%]">
                        <FormControl className="w-full py-2.5 px-6 border border-neutralWhite-400 rounded-sm textBody text-neutralBlack-900 outline-none transition-colors focus:border-neutralBlack-600">
                           {name === 'bio' ? (
                              <textarea
                                 {...field}
                                 placeholder={textPlaceholders.bio}
                                 className="resize-none"
                              ></textarea>
                           ) : (
                              <input
                                 {...field}
                                 className=""
                                 placeholder={textPlaceholders[name]}
                              />
                           )}
                        </FormControl>
                     </FormItem>
                  )}
               />
            ))}
         </form>
      </Form>
   );
};

export default UpdateProfile;
