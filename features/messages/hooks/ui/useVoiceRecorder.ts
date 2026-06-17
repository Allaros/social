import { useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

type UseVoiceRecorderOptions = {
   onRecordingComplete: (file: File) => void;
};

export const useVoiceRecorder = ({
   onRecordingComplete,
}: UseVoiceRecorderOptions) => {
   const [isRecording, setIsRecording] = useState(false);

   const [duration, setDuration] = useState(0);

   const [volume, setVolume] = useState(0);

   const mediaRecorderRef = useRef<MediaRecorder | null>(null);

   const streamRef = useRef<MediaStream | null>(null);

   const chunksRef = useRef<Blob[]>([]);

   const timerRef = useRef<NodeJS.Timeout | null>(null);

   const audioContextRef = useRef<AudioContext | null>(null);

   const analyserRef = useRef<AnalyserNode | null>(null);

   const animationFrameRef = useRef<number | null>(null);

   const startVolumeTracking = () => {
      const analyser = analyserRef.current;

      if (!analyser) {
         return;
      }

      const dataArray = new Uint8Array(analyser.fftSize);

      const tick = () => {
         analyser.getByteTimeDomainData(dataArray);

         let sum = 0;

         for (const value of dataArray) {
            const normalized = (value - 128) / 128;

            sum += normalized * normalized;
         }

         const rms = Math.sqrt(sum / dataArray.length);

         setVolume(rms);

         animationFrameRef.current = requestAnimationFrame(tick);
      };

      tick();
   };

   const cleanup = () => {
      if (timerRef.current) {
         clearInterval(timerRef.current);
      }

      if (animationFrameRef.current) {
         cancelAnimationFrame(animationFrameRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());

      audioContextRef.current?.close();

      setVolume(0);
   };

   const startRecording = async () => {
      if (isRecording) {
         return;
      }

      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
         });

         const recorder = new MediaRecorder(stream);

         const audioContext = new AudioContext();

         const analyser = audioContext.createAnalyser();

         const source = audioContext.createMediaStreamSource(stream);

         source.connect(analyser);

         chunksRef.current = [];

         recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
               chunksRef.current.push(event.data);
            }
         };

         recorder.start();

         mediaRecorderRef.current = recorder;

         streamRef.current = stream;

         audioContextRef.current = audioContext;

         analyserRef.current = analyser;

         setDuration(0);

         timerRef.current = setInterval(() => {
            setDuration((prev) => prev + 1);
         }, 1000);

         startVolumeTracking();

         setIsRecording(true);
      } catch (error) {
         console.error(error);

         toast.error('Не удалось начать запись');
      }
   };

   const stopRecording = () => {
      const recorder = mediaRecorderRef.current;

      if (!recorder || recorder.state === 'inactive') {
         return;
      }

      recorder.onstop = () => {
         const blob = new Blob(chunksRef.current, {
            type: recorder.mimeType || 'audio/webm',
         });

         const file = new File([blob], `voice-${Date.now()}.webm`, {
            type: recorder.mimeType || 'audio/webm',
         });

         onRecordingComplete(file);

         cleanup();
      };

      recorder.stop();

      setIsRecording(false);
   };

   useEffect(() => {
      if (!isRecording) {
         return;
      }

      const handlePointerUp = () => {
         stopRecording();
      };

      window.addEventListener('mouseup', handlePointerUp);

      window.addEventListener('touchend', handlePointerUp);

      return () => {
         window.removeEventListener('mouseup', handlePointerUp);

         window.removeEventListener('touchend', handlePointerUp);
      };
   }, [isRecording]);

   useEffect(() => {
      return () => {
         cleanup();
      };
   }, []);

   return {
      isRecording,
      duration,
      volume,

      startRecording,
      stopRecording,
   };
};
