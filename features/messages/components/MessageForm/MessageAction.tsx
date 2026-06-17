import { MicIcon, SendIcon } from 'lucide-react';

type MessageActionProps = {
   hasContent: boolean;
   canSend: boolean;

   isRecording: boolean;
   duration: number;
   volume: number;

   onStartRecording: () => void;
};

export const MessageAction = ({
   hasContent,
   canSend,

   isRecording,
   duration,
   volume,

   onStartRecording,
}: MessageActionProps) => {
   if (hasContent) {
      return (
         <button
            type="submit"
            disabled={!canSend}
            className="bg-primary-900 hover:bg-primary-800 cursor-pointer transition duration-200 rounded-full text-neutralWhite-100 flex items-center justify-center size-10 disabled:opacity-70 shrink-0"
         >
            <SendIcon
               size={18}
               strokeWidth={2}
               className="-translate-x-[0.5px] translate-y-[0.5px]"
            />
         </button>
      );
   }

   return (
      <div className="relative shrink-0 flex items-center justify-center">
         {isRecording && (
            <>
               <div
                  className="absolute rounded-full bg-primary-900/20 transition-transform duration-75"
                  style={{
                     width: 44,
                     height: 44,

                     transform: `scale(${1.15 + volume * 4})`,
                  }}
               />

               <div className="absolute -top-7 text-xs font-medium text-primary-900 whitespace-nowrap">
                  {duration} c
               </div>
            </>
         )}

         <button
            type="button"
            onMouseDown={onStartRecording}
            onTouchStart={onStartRecording}
            className={`
               relative z-10
               size-10
               rounded-full
               bg-primary-900
               text-neutralWhite-100
               flex items-center justify-center
               cursor-pointer
               transition
               hover:bg-primary-800
               ${isRecording ? 'scale-110' : ''}
            `}
         >
            <MicIcon size={18} />
         </button>
      </div>
   );
};
