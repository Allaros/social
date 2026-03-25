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

export type ModalPayloadMap = {
   confirm: ConfirmPayload;
   preview: PreviewPayload;
};
