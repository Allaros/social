import { PaperclipIcon } from 'lucide-react';
import { useRef } from 'react';

type AttachmentButtonProps = {
   onFiles: (files: File[]) => void;

   disabled?: boolean;
};

export const AttachmentButton = ({
   onFiles,
   disabled,
}: AttachmentButtonProps) => {
   const inputRef = useRef<HTMLInputElement | null>(null);

   const handleClick = () => {
      inputRef.current?.click();
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files?.length) return;

      onFiles(Array.from(files));

      e.target.value = '';
   };

   return (
      <>
         <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={handleChange}
            disabled={disabled}
         />

         <button
            className="hover:bg-neutralWhite-400 cursor-pointer transition-colors text-neutralBlack-500 flex items-center justify-center p-2 rounded-full"
            type="button"
            onClick={handleClick}
            disabled={disabled}
         >
            <PaperclipIcon size={20}></PaperclipIcon>
         </button>
      </>
   );
};
