export const MODALS = {
   CONFIRM: 'confirm',
   PREVIEW: 'preview',
   POST_SETTINGS: 'postSettings',
   POST_EDIT: 'postEdit',
   MESSAGE_DELETE: 'messageDelete',
   CHAT_DELETE: 'chatDelete',
} as const;
export type ModalType = (typeof MODALS)[keyof typeof MODALS];
