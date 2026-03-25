export const MODALS = {
   CONFIRM: 'confirm',
   PREVIEW: 'preview',
} as const;
export type ModalType = (typeof MODALS)[keyof typeof MODALS];
