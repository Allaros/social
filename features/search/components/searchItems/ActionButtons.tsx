import Image from 'next/image';
import React from 'react';
import ChevronIco from '@/public/icons/Chevron Left.svg';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import Link from 'next/link';

const ActionButtons = ({ link, func }: { link: string; func: () => void }) => {
   const isMobile = useIsMobile();
   return (
      <div className="textBody-medium flex flex-col max-md:flex-row items-stretch gap-2 max-md:gap-4">
         <button className="bg-primary-900 cursor-pointer transition-colors text-neutralWhite-100 hover:bg-primary-800 rounded-sm px-3 max-md:px-1 py-1 flex items-center justify-center gap-1 z-10">
            <span className="max-md:hidden">Добавить в друзья</span>{' '}
            <span className="addFriend"></span>
         </button>
         {!isMobile && (
            <Link
               href={link}
               className="hover:bg-neutralWhite-500 border border-neutralWhite-500 cursor-pointer px-3 max-md:bg-neutralWhite-500 max-md:px-1 py-1 rounded-sm transition-colors flex items-center justify-center gap-1 z-10"
            >
               <span className="max-md:hidden">Посетить</span>
               <Image
                  src={ChevronIco}
                  width={18}
                  height={18}
                  alt="visit profile"
                  className="rotate-180 "
               ></Image>
            </Link>
         )}
      </div>
   );
};

export default ActionButtons;
