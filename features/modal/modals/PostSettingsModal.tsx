import { FormField, FormItem, FormControl } from '@/shared/components/ui/form';

import { motion } from 'framer-motion';
import { PostSettingsPayload } from '../types/modalPayload';
import { FormProvider } from 'react-hook-form';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/ui/select';
import { Checkbox } from '@/shared/components/ui/checkbox';

interface Props {
   payload: PostSettingsPayload;
   close: () => void;
}

const PostSettingsModal = ({ close, payload }: Props) => {
   const { form } = payload;

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
            className="card px-6 mx-4 max-sm:px-2 max-sm:pb-4 max-sm:text-center py-6 relative max-w-125 w-full flex flex-col gap-5"
         >
            <h2 className="h4">Настройки поста</h2>
            <FormProvider {...form}>
               <div className="flex items-center gap-4">
                  <FormField
                     control={form.control}
                     name="allowComments"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <Checkbox
                                    checked={!field.value}
                                    onCheckedChange={(checked) =>
                                       field.onChange(!(checked === true))
                                    }
                                    className="cursor-pointer rounded-[4px]"
                                 />
                                 <span className="textBody">
                                    Запретить комментарии
                                 </span>
                              </label>
                           </FormControl>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="visibility"
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormControl className="textBody ">
                              <Select
                                 value={field.value}
                                 onValueChange={field.onChange}
                              >
                                 <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Выберите видимость" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem
                                       className="cursor-pointer"
                                       value="public"
                                    >
                                       Виден всем
                                    </SelectItem>
                                    <SelectItem
                                       className="cursor-pointer"
                                       value="followers"
                                    >
                                       Только подписчикам
                                    </SelectItem>
                                    <SelectItem
                                       className="cursor-pointer"
                                       value="private"
                                    >
                                       Только мне
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>
            </FormProvider>
            <button
               className="bg-primary-800 hover:bg-primary-900 cursor-pointer rounded-[100px] text-neutralWhite-100 textBody-medium px-5 py-1 "
               onClick={close}
            >
               Готово
            </button>
         </motion.div>
      </motion.div>
   );
};

export default PostSettingsModal;
