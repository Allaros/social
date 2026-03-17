export const MODALS = {
   CONFIRM: 'confirm',
} as const;
export type ModalType = (typeof MODALS)[keyof typeof MODALS];
