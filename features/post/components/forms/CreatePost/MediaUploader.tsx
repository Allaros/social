'use client';
import Image, { StaticImageData } from 'next/image';
import { useRef, useState, useEffect } from 'react';
import ImageIcon from '@/public/icons/Media.svg';
import { toast } from 'sonner';
import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';

export type MediaItem = {
   file: File;
   preview: string;
   type: PostMediaType;
};

interface Props {
   value: MediaItem[];
   onChange: (items: MediaItem[]) => void;
   icon?: StaticImageData | string;
   text?: string;
   className?: string;
   maxFiles?: number;
   maxImageMb?: number;
   maxVideoMb?: number;
   allowedTypes: string[];
}

const MediaUploader = ({
   value,
   onChange,
   icon,
   text,
   className,
   maxFiles,
   maxImageMb,
   maxVideoMb,
   allowedTypes,
}: Props) => {
   const inputRef = useRef<HTMLInputElement | null>(null);
   const [dragging, setDragging] = useState(false);

   const { openModal } = useModal();

   const MAX_FILES = maxFiles ?? 10;
   const MAX_IMAGE_MB = maxImageMb ?? 5;
   const MAX_VIDEO_MB = maxVideoMb ?? 20;

   useEffect(() => {
      return () => {
         value.forEach((item) => URL.revokeObjectURL(item.preview));
      };
   }, []);

   const addFiles = (files: File[]) => {
      const availableSlots = MAX_FILES - value.length;

      if (availableSlots <= 0) {
         toast(`Максимум ${MAX_FILES} файлов`);
         return;
      }

      const existingFiles = new Set(
         value.map(
            (f) => `${f.file.name}-${f.file.size}-${f.file.lastModified}`
         )
      );

      const validFiles: File[] = [];

      for (const file of files) {
         const key = `${file.name}-${file.size}-${file.lastModified}`;

         if (existingFiles.has(key)) continue;

         if (!allowedTypes.includes(file.type)) {
            toast(`Тип файла не поддерживается: ${file.type}`);
            continue;
         }

         const isVideo = file.type.startsWith('video/');
         const maxSize = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB;

         if (file.size > maxSize * 1024 * 1024) {
            toast(
               `${isVideo ? 'Видео' : 'Изображение'} слишком большое (макс ${maxSize}MB)`
            );
            continue;
         }

         validFiles.push(file);
      }

      const sliced = validFiles.slice(0, availableSlots);

      const newItems: MediaItem[] = sliced.map((file) => ({
         file,
         preview: URL.createObjectURL(file),
         type: file.type.startsWith('video/') ? 'video' : 'image',
      }));

      onChange([...value, ...newItems]);
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

      addFiles(Array.from(e.dataTransfer.files));
   };

   const removeMedia = (index: number) => {
      const item = value[index];
      if (item) {
         URL.revokeObjectURL(item.preview);
      }

      onChange(value.filter((_, i) => i !== index));
   };

   const accept = allowedTypes.join(',');

   return (
      <div>
         <input
            ref={inputRef}
            type="file"
            multiple
            accept={accept}
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
            className={`textBody flex items-center ${className} hover:bg-neutralWhite-400 gap-2 rounded-lg px-2 py-1 text-center cursor-pointer transition ${
               dragging
                  ? 'bg-neutralWhite-200 border-neutralWhite-500'
                  : 'bg-neutralWhite-100 border-neutralWhite-400'
            }`}
         >
            <Image
               src={icon ?? ImageIcon}
               alt="Add media"
               width={20}
               height={20}
               unoptimized
            />
            {text ?? 'Выбрать медиа'}
         </div>

         {value.length > 0 && (
            <div className="textBody mt-2 text-neutralBlack-500">
               {value.length}/{MAX_FILES} файлов
            </div>
         )}

         {value.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mt-3 max-md:grid-cols-3">
               {value.map((item, i) => {
                  const { file, preview } = item;

                  return (
                     <div key={item.preview} className="relative">
                        {item.type === 'image' ? (
                           <img
                              src={preview}
                              className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-85 transition-opacity"
                              onClick={() =>
                                 openModal(MODALS.PREVIEW, {
                                    items: value.map((item) => ({
                                       src: item.preview,
                                       type: item.file.type,
                                    })),
                                    index: i,
                                 })
                              }
                           />
                        ) : (
                           <video
                              src={preview}
                              className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-85 transition-opacity"
                              onClick={() =>
                                 openModal(MODALS.PREVIEW, {
                                    items: value.map((item) => ({
                                       src: item.preview,
                                       type: item.file.type,
                                    })),
                                    index: i,
                                 })
                              }
                           />
                        )}

                        {file.type.startsWith('video/') && (
                           <div className="absolute bottom-1 left-1 text-white text-xs bg-black/60 px-1 rounded">
                              video
                           </div>
                        )}

                        <button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation();
                              removeMedia(i);
                           }}
                           className="absolute top-1 right-1 bg-neutralBlack-900/60 text-white text-xs px-1 rounded cursor-pointer hover:bg-neutralWhite-400/40 transition-colors"
                        >
                           ✕
                        </button>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default MediaUploader;
