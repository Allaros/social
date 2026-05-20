import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import SearchIco from '@/public/icons/Search.svg';
import Image from 'next/image';
type FormValues = {
   query: string;
};

const FriendsSearch = ({ form }: { form: UseFormReturn<FormValues> }) => {
   return (
      <div className="flex items-center gap-2 rounded-sm mx-2 my-2 px-2 border border-neutralWhite-400">
         <Image src={SearchIco} alt={'Search'} width={20} height={20} />
         <input
            className="flex-1 outline-none  py-2 pr-4 textBody"
            placeholder="Найти по имени..."
            {...form.register('query')}
         />
      </div>
   );
};

export default FriendsSearch;
