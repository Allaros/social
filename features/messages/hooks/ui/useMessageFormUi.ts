import React, { useRef, useState } from 'react';

type UseMessageFormUIOptions = {
   onSubmit: () => void;

   onFiles: (files: File[]) => void;

   setText: (value: string) => void;
};

export const useMessageFormUI = ({
   onSubmit,
   onFiles,
   setText,
}: UseMessageFormUIOptions) => {
   const textareaRef = useRef<HTMLTextAreaElement | null>(null);

   const dragCounterRef = useRef(0);

   const [isDragging, setIsDragging] = useState(false);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();

         onSubmit();
      }
   };

   const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;

      textarea.style.height = 'auto';

      textarea.style.height = `${textarea.scrollHeight}px`;

      setText(textarea.value);
   };

   const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();

      dragCounterRef.current++;

      setIsDragging(true);
   };

   const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();

      dragCounterRef.current--;

      if (dragCounterRef.current === 0) {
         setIsDragging(false);
      }
   };

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();

      dragCounterRef.current = 0;

      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);

      if (files.length) {
         onFiles(files);
      }
   };

   const resetTextareaHeight = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
      }
   };

   return {
      textareaRef,

      isDragging,

      handleKeyDown,
      handleTextareaChange,

      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,

      resetTextareaHeight,
   };
};
