import { fileIcons } from '../constant/file-icons';

export const getFileIcon = (mimeType?: string) => {
   if (!mimeType) {
      return fileIcons.default;
   }

   if (mimeType === 'application/pdf') {
      return fileIcons.pdf;
   }

   if (
      mimeType.includes('word') ||
      mimeType.includes('officedocument.wordprocessingml')
   ) {
      return fileIcons.document;
   }

   if (mimeType.includes('sheet') || mimeType.includes('excel')) {
      return fileIcons.spreadsheet;
   }

   if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
      return fileIcons.presentation;
   }

   if (
      mimeType.includes('zip') ||
      mimeType.includes('rar') ||
      mimeType.includes('7z')
   ) {
      return fileIcons.archive;
   }

   if (mimeType.startsWith('audio/')) {
      return fileIcons.audio;
   }

   return fileIcons.default;
};
