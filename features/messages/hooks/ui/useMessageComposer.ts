import { useContext } from 'react';
import { MessageComposerContext } from '../../providers/MessageComposerProvider';

export const useMessageComposer = () => {
   const context = useContext(MessageComposerContext);

   if (!context) {
      throw new Error(
         'useMessageComposer должен использоваться внутри MessageComposerProvider'
      );
   }

   return context;
};
