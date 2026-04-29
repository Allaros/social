'use client';

import { useRef } from 'react';
import { EditableMedia } from '../types/modal.interface';
import AddIco from '@/public/icons/Add.svg';

type Props = {
   value: EditableMedia[];
   onChange: (value: EditableMedia[]) => void;
};

const EditMediaField = ({ onChange, value }: Props) => {
   const inputRef = useRef<HTMLInputElement | null>(null);

   const addFiles = (files: File[]) => {
      const newItems: EditableMedia[] = files.map((file) => ({
         kind: 'new',
         file,
         preview: URL.createObjectURL(file),
         type: file.type.startsWith('video/') ? 'video' : 'image',
      }));

      onChange([...value, ...newItems]);
   };

   const remove = (index: number) => {
      const item = value[index];

      if (item.kind === 'new') {
         URL.revokeObjectURL(item.preview);
      }

      onChange(value.filter((_, i) => i !== index));
   };

   return (
      <div>
         <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => {
               if (!e.target.files) return;
               addFiles(Array.from(e.target.files));
            }}
         />
         <div className="grid grid-cols-3 gap-2">
            {value.map((item, i) => (
               <div key={i} className="relative">
                  {item.type === 'image' ? (
                     <img
                        src={item.kind === 'existing' ? item.url : item.preview}
                        className="w-full h-32 object-cover rounded"
                     />
                  ) : (
                     <video
                        src={item.kind === 'existing' ? item.url : item.preview}
                        className="w-full h-32 object-cover rounded"
                     />
                  )}

                  <button
                     type="button"
                     onClick={() => remove(i)}
                     className="absolute top-1 right-1 bg-neutralBlack-900/60 transition-colors cursor-pointer text-white px-1 rounded hover:bg-neutralBlack-900/80"
                  >
                     ✕
                  </button>
               </div>
            ))}

            <button
               type="button"
               onClick={() => inputRef.current?.click()}
               className="h-32 cursor-pointer group border rounded flex items-center justify-center transition-colors hover:bg-neutralWhite-400"
            >
               <AddIco />
            </button>
         </div>
      </div>
   );
};

export default EditMediaField;
