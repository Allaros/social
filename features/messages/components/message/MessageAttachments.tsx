'use client';

import React from 'react';
import { MessageAttachment } from '../../types/messages.types';
import { groupMessageAttachments } from '../../utils/group-message-attachments';
import MediaAttachment from './attachments/MediaAttachment';
import AudioAttachment from './attachments/AudioAttachment';
import FileAttachment from './attachments/FileAttachment';
import { useModal } from '@/features/modal/hooks/useModal';
import { MODALS } from '@/features/modal/constants/modals';
import MediaGridLayout from './attachments/MediaGridLayout';

const MessageAttachments = ({
   attachments,
}: {
   attachments: MessageAttachment[];
}) => {
   const { audioAttachments, fileAttachments, mediaAttachments } =
      groupMessageAttachments(attachments);

   const { openModal } = useModal();

   const previewItems = mediaAttachments.map((media) => ({
      src: media.url!,
      type: media.mimeType,
   }));

   return (
      <div>
         {!!mediaAttachments.length && (
            <MediaGridLayout media={mediaAttachments} />
         )}

         {!!audioAttachments.length && (
            <div>
               {audioAttachments.map((audio) => (
                  <AudioAttachment key={audio.id} audio={audio} />
               ))}
            </div>
         )}

         {!!fileAttachments.length && (
            <div>
               {fileAttachments.map((file) => (
                  <FileAttachment key={file.id} file={file} />
               ))}
            </div>
         )}
      </div>
   );
};

export default MessageAttachments;
