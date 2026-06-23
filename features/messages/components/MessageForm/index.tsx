import { messageSchema } from '@/shared/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { useAttachments } from '../../hooks/queries/useAttachments';
import { useSendMessage } from '../../hooks/queries/useSendMessage';
import { AttachmentButton } from './AttachmentButton';
import { AttachmentPreviewList } from './AttachmentPreviewList';
import { handleMessageFiles } from '../../handlers/handle-message-files';
import { useVoiceRecorder } from '../../hooks/ui/useVoiceRecorder';
import { useMessageFormUI } from '../../hooks/ui/useMessageFormUi';
import { MessageAction } from './MessageAction';
import { useMessageComposer } from '../../hooks/ui/useMessageComposer';
import MessageComposerPreview from './MessageComposerPreview';
import { useEditMessage } from '../../hooks/queries/useEditMessage';
import { useForwardMessages } from '../../hooks/queries/useForwardMessages';
import { useMessagesSelectionContext } from '../../providers/MessageSelectionProvider';
import { cn } from '@/shared/lib/utils';
import EditReplyActions from './EditReplyActions';
import MessagesBlock from './MessagesBlock';

type MessageFormValues = z.infer<typeof messageSchema>;

const MessageForm = ({
   chatIdentifier,
   canSendMessages,
   isLeft,
   isPending,
}: {
   chatIdentifier: string;
   canSendMessages: boolean;
   isPending: boolean;
   isLeft?: boolean;
}) => {
   //======================================= Form ==============================================

   const form = useForm<MessageFormValues>({
      resolver: zodResolver(messageSchema),
      defaultValues: { text: '' },
   });
   const text = useWatch({ control: form.control, name: 'text' });
   const textField = form.register('text');

   //======================================= Attachments ==============================================

   const {
      add,
      attachments,
      clear,
      hasFailed,
      isUploading,
      readyAttachments,
      remove,
      updateAttachment,
   } = useAttachments();

   //======================================= Composer ==============================================

   const { action, clearAction } = useMessageComposer();
   const { mutate: editMessage } = useEditMessage(chatIdentifier);

   const { isSelectionMode } = useMessagesSelectionContext();

   const handleClearComposer = () => {
      clearAction();

      form.reset({
         text: '',
      });

      resetTextareaHeight();
   };

   useEffect(() => {
      if (action?.type !== 'edit') {
         return;
      }

      form.setValue('text', action.message.content?.text ?? '');

      requestAnimationFrame(() => {
         const textarea = textareaRef.current;

         if (!textarea) return;

         textarea.style.height = 'auto';
         textarea.style.height = `${textarea.scrollHeight}px`;
      });
   }, [action, form]);

   //======================================= Sending ==============================================

   const { mutateAsync: sendMessage, isPending: sendingPending } =
      useSendMessage(chatIdentifier);
   const { mutateAsync: forwardMessages, isPending: forwardPending } =
      useForwardMessages(chatIdentifier);

   const isSending = sendingPending || forwardPending;

   const hasForwardMessages =
      action?.type === 'forward' && action.messages.length > 0;

   const hasContent =
      (text ?? '').trim().length > 0 ||
      attachments.length > 0 ||
      hasForwardMessages;

   const canSend =
      hasContent && !isUploading && !hasFailed && !isSending && !isPending;

   //======================================= Voice ==============================================

   const { isRecording, duration, volume, startRecording } = useVoiceRecorder({
      onRecordingComplete: (file) => {
         handleFiles([file]);
      },
   });

   //======================================= Submitting ==============================================

   const retryAttachment = (attachmentId: string) => {
      const attachment = attachments.find((a) => a.id === attachmentId);

      if (!attachment) return;

      void handleMessageFiles({
         attachments: [attachment],
         chatIdentifier,

         onProgress: (id, progress) => {
            updateAttachment(id, {
               progress,
            });
         },

         onStatusChange: (id, status, patch) => {
            updateAttachment(id, {
               status,
               ...patch,
            });
         },
      });
   };

   const handleFiles = (files: File[]) => {
      const added = add(files);

      if (!added.length) return;

      void handleMessageFiles({
         attachments: added,
         chatIdentifier,

         onProgress: (id, progress) => {
            updateAttachment(id, {
               progress,
            });
         },

         onStatusChange: (id, status, patch) => {
            updateAttachment(id, {
               status,
               ...patch,
            });
         },
      });
   };

   const handleSubmit = form.handleSubmit(async (values) => {
      if (!canSend) {
         return;
      }
      const text = values.text?.trim() || undefined;

      switch (action?.type) {
         case 'edit':
            editMessage({
               messageId: action.message.id,
               text: text ?? '',
            });
            break;

         default: {
            if (text || attachments.length) {
               const clientId = crypto.randomUUID();
               await sendMessage({
                  text,

                  replyToMessageId:
                     action?.type === 'reply' ? action.message.id : undefined,

                  attachments: readyAttachments,
                  clientId,
               });
            }

            if (action?.type === 'forward' && action.messages.length > 0) {
               const forwardPayload = action.messages.map((message) => {
                  const clientId = crypto.randomUUID();

                  return {
                     id: message.id,
                     clientId: clientId,
                  };
               });
               await forwardMessages({
                  forwardPayload,
                  messages: action.messages,
               });
            }

            break;
         }
      }

      form.reset();

      clear();

      clearAction();

      resetTextareaHeight();
   });

   const {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleKeyDown,
      handleTextareaChange,
      isDragging,
      resetTextareaHeight,
      textareaRef,
   } = useMessageFormUI({
      onSubmit: handleSubmit,
      onFiles: handleFiles,
      setText: (value) => {
         form.setValue('text', value);
      },
   });

   if (!canSendMessages) return <MessagesBlock isLeft={isLeft ?? false} />;

   return (
      <div className="relative">
         <EditReplyActions
            className={cn(
               'absolute z-1 bottom-0 left-0 w-full h-12 flex items-center gap-4 px-4 justify-around transition-transform duration-300',
               isSelectionMode
                  ? 'translate-y-0 pointer-events-auto'
                  : 'translate-y-full pointer-events-none'
            )}
            chatIdentifier={chatIdentifier}
         />
         <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
               'border-t border-neutralWhite-400 transition-all duration-300 relative z-2',
               isDragging ? 'bg-neutralWhite-200' : '',
               isSelectionMode && 'translate-y-full'
            )}
         >
            <MessageComposerPreview
               action={action}
               onClose={handleClearComposer}
            />
            {attachments.length > 0 && (
               <AttachmentPreviewList
                  attachments={attachments}
                  onRemove={remove}
                  onClear={clear}
                  onRetry={retryAttachment}
               />
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3">
               <AttachmentButton
                  onFiles={handleFiles}
                  disabled={isSending || action?.type === 'edit'}
               />
               <textarea
                  name={textField.name}
                  onBlur={textField.onBlur}
                  ref={(el) => {
                     textField.ref(el);
                     textareaRef.current = el;
                  }}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder={
                     action?.type === 'edit'
                        ? 'Редактирование сообщения...'
                        : isDragging
                          ? 'Отпустите файлы...'
                          : 'Написать сообщение...'
                  }
                  rows={1}
                  disabled={isSending}
                  className="flex-1 resize-none overflow-hidden max-h-40 rounded-xl bg-muted px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
               />
               <MessageAction
                  hasContent={hasContent}
                  canSend={canSend}
                  isRecording={isRecording}
                  duration={duration}
                  volume={volume}
                  onStartRecording={startRecording}
               />
            </form>
         </div>
      </div>
   );
};

export default MessageForm;
