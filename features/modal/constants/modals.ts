export const MODALS = {
   CONFIRM: 'confirm',
   PREVIEW: 'preview',
   POST_SETTINGS: 'postSettings',
   POST_EDIT: 'postEdit',
   MESSAGE_DELETE: 'messageDelete',
} as const;
export type ModalType = (typeof MODALS)[keyof typeof MODALS];
