import { cn } from '@/shared/lib/utils';
import { XIcon } from 'lucide-react';

type VoiceRecordingPreviewProps = {
   duration: number;

   waveformContainerRef: React.RefObject<HTMLDivElement | null>;

   onCancel: () => void;

   isRecording: boolean;
};

const formatDuration = (seconds: number) => {
   const mins = Math.floor(seconds / 60);

   const secs = seconds % 60;

   return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VoiceRecordingPreview = ({
   duration,
   waveformContainerRef,
   onCancel,
   isRecording,
}: VoiceRecordingPreviewProps) => {
   return (
      <div
         className={cn(
            'absolute bottom-full left-0 right-0',
            'transition-all duration-200',
            isRecording
               ? 'opacity-100 translate-y-0'
               : 'opacity-0 pointer-events-none translate-y-2'
         )}
      >
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
               <div className="size-2 rounded-full bg-red-500 animate-pulse" />

               <span className="text-sm font-medium text-red-500">REC</span>
            </div>

            <div
               ref={waveformContainerRef}
               className="flex-1 overflow-hidden"
            />

            <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
               {formatDuration(duration)}
            </span>

            <button
               type="button"
               onClick={onCancel}
               className="shrink-0 rounded-full p-1 hover:bg-muted transition"
            >
               <XIcon size={18} />
            </button>
         </div>
      </div>
   );
};

export default VoiceRecordingPreview;
