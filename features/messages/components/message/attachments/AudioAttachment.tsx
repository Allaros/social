import { MessageAttachment } from '@/features/messages/types/messages.types';
import { PauseIcon, PlayIcon, Volume2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type AudioAttachmentProps = {
   audio: MessageAttachment;
};

const formatTime = (time: number) => {
   if (!Number.isFinite(time)) {
      return '0:00';
   }

   const minutes = Math.floor(time / 60);
   const seconds = Math.floor(time % 60);

   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioAttachment = ({ audio }: AudioAttachmentProps) => {
   const audioRef = useRef<HTMLAudioElement | null>(null);

   const [isPlaying, setIsPlaying] = useState(false);

   const [duration, setDuration] = useState(0);

   const [currentTime, setCurrentTime] = useState(0);

   useEffect(() => {
      const element = audioRef.current;

      if (!element) {
         return;
      }

      const handleLoadedMetadata = () => {
         setDuration(element.duration);
      };

      const handleTimeUpdate = () => {
         setCurrentTime(element.currentTime);
      };

      const handleEnded = () => {
         setIsPlaying(false);
         setCurrentTime(0);
      };

      element.addEventListener('loadedmetadata', handleLoadedMetadata);

      element.addEventListener('timeupdate', handleTimeUpdate);

      element.addEventListener('ended', handleEnded);

      return () => {
         element.removeEventListener('loadedmetadata', handleLoadedMetadata);

         element.removeEventListener('timeupdate', handleTimeUpdate);

         element.removeEventListener('ended', handleEnded);
      };
   }, []);

   const togglePlayback = async () => {
      const element = audioRef.current;

      if (!element) {
         return;
      }

      if (isPlaying) {
         element.pause();

         setIsPlaying(false);

         return;
      }

      await element.play();

      setIsPlaying(true);
   };

   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const element = audioRef.current;

      if (!element) {
         return;
      }

      const time = Number(e.target.value);

      element.currentTime = time;

      setCurrentTime(time);
   };

   const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

   return (
      <div className="flex items-center gap-3 rounded-2xl bg-neutral-100 px-3 py-2 min-w-[260px] max-w-[320px]">
         <audio ref={audioRef} src={audio.url!} preload="metadata" />

         <button
            type="button"
            onClick={togglePlayback}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-[1.03] active:scale-[0.97]"
         >
            {isPlaying ? (
               <PauseIcon size={18} />
            ) : (
               <PlayIcon size={18} className="translate-x-[1px]" />
            )}
         </button>

         <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="relative h-2">
               <div className="absolute inset-0 rounded-full bg-neutral-300" />

               <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all"
                  style={{
                     width: `${progress}%`,
                  }}
               />

               <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
               />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
               <div className="flex items-center gap-1">
                  <Volume2Icon size={12} />

                  <span>Voice message</span>
               </div>

               <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
               </span>
            </div>
         </div>
      </div>
   );
};

export default AudioAttachment;
