import React from 'react';
import { MessageAttachment } from '../../types/messages.types';
import { groupMessageAttachments } from '../../utils/group-message-attachments';
import MediaAttachment from './attachments/MediaAttachment';
import AudioAttachment from './attachments/AudioAttachment';
import FileAttachment from './attachments/FileAttachment';

const MessageAttachments = ({
   attachments,
}: {
   attachments: MessageAttachment[];
}) => {
   const { audioAttachments, fileAttachments, mediaAttachments } =
      groupMessageAttachments(attachments);

   return (
      <div>
         {!!mediaAttachments.length && (
            <div>
               {mediaAttachments.map((media) => (
                  <MediaAttachment key={media.id} media={media} />
               ))}
            </div>
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
