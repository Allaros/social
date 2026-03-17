'use client';

import { Controller, useForm } from 'react-hook-form';
import PostEditor from './PostEditor';
import ImageUploader from './ImageUploader';

interface FormData {
   content: string;
   images: File[];
}

const CreatePostForm = () => {
   const { control, handleSubmit, setValue, watch } = useForm<FormData>({
      defaultValues: {
         content: '',
         images: [],
      },
   });

   const images = watch('images');

   const onsubmit = (data: FormData) => {
      console.log(data);
   };
   return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onsubmit)}>
         <Controller
            name="content"
            control={control}
            render={({ field }) => (
               <PostEditor value={field.value} onChange={field.onChange} />
            )}
         />
         <div className="flex items-center justify-between">
            <ImageUploader
               images={images}
               onChange={(files) => setValue('images', files)}
            />
            <button
               className="text-neutralWhite-100 textBody-medium transition-colors bg-primary-900 px-5 py-0.75 rounded-[100px] cursor-pointer hover:bg-primary-800"
               type="submit"
            >
               Post
            </button>
         </div>
      </form>
   );
};

export default CreatePostForm;
