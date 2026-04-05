export const MODALS = {
   CONFIRM: 'confirm',
   PREVIEW: 'preview',
   POST_SETTINGS: 'postSettings',
   POST_EDIT: 'postEdit',
} as const;
export type ModalType = (typeof MODALS)[keyof typeof MODALS];
