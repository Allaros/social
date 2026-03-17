export type ConfirmPayload = {
   title: string;
   description?: string;
   confirmText?: string;
   cancelText?: string;
   variant?: 'normal' | 'destructive';
   onConfirm: () => void | Promise<void>;
};

export type ModalPayloadMap = {
   confirm: ConfirmPayload;
};
