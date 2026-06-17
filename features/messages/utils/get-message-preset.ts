import {
   MessageAttachment,
   MessageContent,
   MessageViewPreset,
} from '../types/messages.types';

export const getMessageViewPreset = (
   content: MessageContent | null,
   attachments: MessageAttachment[] = []
): MessageViewPreset => {
   let text: string | null = null;

   if (content?.text) text = content.text;
   const hasText = !!text?.trim();

   const hasMedia = attachments.some(
      (attachment) =>
         attachment.mimeType.startsWith('image/') ||
         attachment.mimeType.startsWith('video/')
   );

   if (hasMedia && hasText) {
      return 'mixed';
   }

   if (hasMedia) {
      return 'media';
   }

   return 'text';
};
