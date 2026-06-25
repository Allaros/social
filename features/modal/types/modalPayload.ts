import { CreatePostFormData } from '@/features/post/types/post.interface';
import { PostResponse } from '@/features/post/types/post.responce';
import { UseFormReturn } from 'react-hook-form';

export type ConfirmPayload = {
   title: string;
   description?: string;
   confirmText?: string;
   cancelText?: string;
   variant?: 'normal' | 'destructive';
   onConfirm: () => void | Promise<void>;
};

export interface PreviewPayload {
   items: {
      src: string;
      type: string;
   }[];
   index: number;
}

export type PostSettingsPayload = {
   form: UseFormReturn<CreatePostFormData>;
};

export type PostEditPayload = {
   post: PostResponse;
   username: string;
};

export type ModalPayloadMap = {
   confirm: ConfirmPayload;
   messageDelete: MessageDeletePayload;
   chatDelete: ChatDeletePayload;

   preview: PreviewPayload;
   postSettings: PostSettingsPayload;
   postEdit: PostEditPayload;
   membersToAdd: MembersToAddPayload;
};

export type MessageDeletePayload = {
   messagesCount: number;
   canDeleteForEveryone: boolean;
   onDeleteForMe: () => void | Promise<void>;
   onDeleteForEveryone?: () => void | Promise<void>;
   clearSelection: () => void;
};

export type ChatDeletePayload = {
   onDeleteForMe: () => void | Promise<void>;
   onDeleteForEveryone?: () => void | Promise<void>;
};

export type MembersToAddPayload = {
   chatIdentifier: string;
   isOwner: boolean;
};
