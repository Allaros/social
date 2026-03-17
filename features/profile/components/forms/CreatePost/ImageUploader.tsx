'use client';
import Image, { StaticImageData } from 'next/image';
import { useRef, useState, useEffect } from 'react';
import ImageIcon from '@/public/icons/Media.svg';

interface Props {
   images: File[];
   onChange: (files: File[]) => void;
   icon?: StaticImageData | string;
   text?: string;
   className?: string;
   maxImages?: number;
   maxSizeMb?: number;
}

const ImageUploader = ({
   images,
   onChange,
   icon,
   text,
   className,
   maxImages,
   maxSizeMb,
}: Props) => {
   const inputRef = useRef<HTMLInputElement | null>(null);
   const [dragging, setDragging] = useState(false);
   const [previews, setPreviews] = useState<string[]>([]);

   const MAX_IMAGES = maxImages ?? 10;
   const MAX_SIZE_MB = maxSizeMb ?? 5;

   useEffect(() => {
      const urls = images.map((file) => URL.createObjectURL(file));
      setPreviews(urls);

      return () => {
         urls.forEach((url) => URL.revokeObjectURL(url));
      };
   }, [images]);

   const addFiles = (files: File[]) => {
      const availableSlots = MAX_IMAGES - images.length;
      if (availableSlots <= 0) return;

      const validFiles = files
         .filter((file) => file.type.startsWith('image/'))
         .filter((file) => file.size < MAX_SIZE_MB * 1024 * 1024)
         .slice(0, availableSlots);

      if (validFiles.length === 0) return;

      onChange([...images, ...validFiles]);
   };

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      addFiles(Array.from(e.target.files));
      e.target.value = '';
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);

      const files = Array.from(e.dataTransfer.files);
      addFiles(files);
   };

   const removeImage = (index: number) => {
      onChange(images.filter((_, i) => i !== index));
   };

   return (
      <div>
         <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleInput}
            className="hidden"
         />

         <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
               e.preventDefault();
               setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex items-center ${className} hover:bg-neutralWhite-400 gap-2 rounded-lg px-2 py-1 text-center cursor-pointer transition ${dragging ? 'bg-neutralWhite-200 border-neutralWhite-500' : 'bg-neutralWhite-100 border-neutralWhite-400'}`}
         >
            <Image
               src={icon ?? ImageIcon}
               alt="Add images"
               width={20}
               height={20}
            />
            {text ?? 'Выбрать изображения'}
         </div>

         {images.length > 0 && (
            <div className="text-sm mt-2 text-neutralBlack-500">
               {images.length}/{MAX_IMAGES} изображений
            </div>
         )}

         {previews.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
               {previews.map((src, i) => (
                  <div key={i} className="relative">
                     <img
                        src={src}
                        className="w-full h-20 object-cover rounded"
                     />

                     <button
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation();
                           removeImage(i);
                        }}
                        className="absolute cursor-pointer top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                     >
                        ✕
                     </button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default ImageUploader;
