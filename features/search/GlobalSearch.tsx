'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import SearchDropdownMenu from './components/SearchDropdownMenu';
import { X } from 'lucide-react';

const GlobalSearch = ({ closeFunc }: { closeFunc?: () => void }) => {
   const [searchQuery, setSearchQuery] = useState('');
   const [isFocus, setIsFocus] = useState(false);
   const [debouncedQuery, setDebouncedQuery] = useState('');
   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         const normalizedQuery = searchQuery.trim();
         setDebouncedQuery(normalizedQuery);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
   }, [searchQuery]);
   return (
      <div className="relative">
         <div className="card flex items-center gap-4 py-2 md:px-6 px-3">
            <Image
               src="/icons/Search.svg"
               alt="search button"
               width={20}
               height={20}
            ></Image>
            <input
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="outline-none textBody w-full text-neutralBlack-900"
               placeholder="Найти..."
               onFocus={() => setIsFocus(true)}
               onBlur={() => {
                  setTimeout(() => setIsFocus(false), 150);
               }}
            />
            {closeFunc && (
               <div>
                  <button
                     onClick={closeFunc}
                     className="justify-self-end flex items-center justify-center"
                  >
                     <X className="text-neutralBlack-500"></X>
                  </button>
               </div>
            )}
         </div>
         <SearchDropdownMenu
            onClose={closeFunc}
            query={debouncedQuery}
            className={`absolute top-full z-20 left-0 w-full transition duration-500 ${isFocus && debouncedQuery.length > 2 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
         />
      </div>
   );
};

export default GlobalSearch;
