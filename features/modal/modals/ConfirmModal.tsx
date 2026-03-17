import CloseIco from '@/public/icons/X.svg';
import { motion } from 'framer-motion';
import { ConfirmPayload } from '../types/modalPayload';
import CustomButton from '@/shared/components/CustomButton';

interface Props {
   payload: ConfirmPayload;
   close: () => void;
}

const ConfirmModal = ({ payload, close }: Props) => {
   const { onConfirm, title, cancelText, confirmText, description, variant } =
      payload;

   const currentVariant = variant ?? 'normal';

   const variantStyles = {
      normal: 'bg-primary-900 hover:bg-primary-700',
      destructive: 'bg-danger-800 hover:bg-danger-900',
   };

   const handleConfirm = async () => {
      await onConfirm?.();
      close();
   };

   return (
      <motion.div
         onClick={() => close()}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="fixed top-0 left-0 w-full h-full bg-neutralBlack-900/40 flex items-center justify-center z-50"
      >
         <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="card px-6 mx-4 max-sm:px-2 max-sm:pb-4 max-sm:text-center py-6 relative max-w-125 w-full"
         >
            <CustomButton
               buttonFunc={close}
               imageSrc={CloseIco}
               alt="Close modal"
               h={20}
               w={20}
               className="cursor-pointer hover:bg-neutralWhite-400 rounded-full p-1.5 absolute top-1 right-1"
            />
            <div className="h4 text-neutralBlack-900 mb-2">{title}</div>
            {description && (
               <p className="textBody text-neutralBlack-600">{description}</p>
            )}
            <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-4 px-4 mt-6 max-sm:flex-col">
               <button
                  onClick={handleConfirm}
                  className={`${variantStyles[currentVariant as keyof typeof variantStyles]} text-neutralWhite-100 h5 px-4 py-1 rounded-[100px] cursor-pointer  transition-colors`}
               >
                  {confirmText ?? 'Подтвердить'}
               </button>
               <button
                  onClick={() => close()}
                  className="h5 rounded-[100px] py-1 px-4 hover:bg-neutralWhite-400 cursor-pointer max-sm:bg-neutralWhite-400"
               >
                  {cancelText ?? 'Отменить'}
               </button>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default ConfirmModal;
