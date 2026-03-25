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
import ImageUploader from '../../../post/components/forms/CreatePost/MediaUploader';
import UploadIco from '@/public/icons/Upload.svg';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

type FormValues = z.infer<typeof UpdateProfileSchema>;
type TextField = Exclude<keyof FormValues, 'image'>;

const textFields: TextField[] = ['name', 'username', 'bio'];

const textPlaceholders: Record<TextField, string> = {
   name: 'Ваше имя',
   username: 'Имя пользователя',
   bio: 'Ваш статус',
};

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

const UpdateProfile = ({ username }: { username: string }) => {
   const { mutate: updateProfile } = useUpdateProfile(username);
   const form = useForm<FormValues>({
      resolver: zodResolver(UpdateProfileSchema),
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: {
         bio: '',
         name: '',
         username: '',
         image: undefined,
      },
   });

   const onSubmit = (data: FormValues) => {
      const formData = new FormData();
      if (data.name) {
         formData.append('name', data.name);
      }
      if (data.username) {
         formData.append('username', data.username);
      }
      if (data.bio) {
         formData.append('bio', data.bio);
      }

      if (data.image) {
         formData.append('image', data.image.file);
      }
      updateProfile(formData, {
         onSuccess: () => {
            form.reset();
         },
      });
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
                           maxFiles={1}
                           maxImageMb={10}
                           className="border-2 border-dashed border-neutralWhite-400 py-3 px-5 text-neutralBlack-600 textBody"
                           value={field.value ? [field.value] : []}
                           onChange={(files) => field.onChange(files[0])}
                           allowedTypes={allowedTypes}
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
                        <FormMessage></FormMessage>
                     </FormItem>
                  )}
               />
            ))}
            <button
               type="submit"
               className="textBody-medium text-neutralWhite-100 bg-neutralBlack-900 hover:bg-neutralBlack-850 transition-colors cursor-pointer rounded-sm py-2 px-6"
            >
               Сохранить
            </button>
         </form>
      </Form>
   );
};

export default UpdateProfile;
