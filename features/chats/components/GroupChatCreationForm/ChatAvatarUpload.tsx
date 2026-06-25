import { Plus, X } from 'lucide-react';
import { useRef } from 'react';

type GroupAvatarFieldProps = {
   previewUrl: string | null;

   onSelect: (file: File) => void;

   onClear: () => void;
};

export const ChatAvatarUpload = ({
   previewUrl,
   onSelect,
   onClear,
}: GroupAvatarFieldProps) => {
   const handleClear = () => {
      onClear();

      if (inputRef.current) {
         inputRef.current.value = '';
      }
   };
   const inputRef = useRef<HTMLInputElement>(null);
   return (
      <div>
         <label>
            <input
               type="file"
               accept="image/*"
               ref={inputRef}
               hidden
               onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                     onSelect(file);
                  }
               }}
            />

            {previewUrl ? (
               <img
                  src={previewUrl}
                  alt="Group avatar"
                  className="size-24 rounded-full object-cover"
               />
            ) : (
               <div className="size-24 text-neutralBlack-500 hover:bg-neutralWhite-500 transition-colors cursor-pointer rounded-full border flex items-center justify-center">
                  <Plus size={40} />
               </div>
            )}
         </label>

         {previewUrl && (
            <button
               type="button"
               className="text-neutralBlack-900 textBody rounded-sm cursor-pointer py-1 px-2 bg-neutralWhite-500 mt-2"
               onClick={handleClear}
            >
               Убрать фото
            </button>
         )}
      </div>
   );
};
