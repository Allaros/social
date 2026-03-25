'use client';
import { SearchSections, sectionOrder, sectionTitles } from '../types/response';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SearchTabs = ({ type }: { type: SearchSections }) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const pathname = usePathname();

   const handleTabClick = (section: SearchSections) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('type', section);
      params.set('page', '1');

      router.push(`${pathname}?${params.toString()}`);
   };
   return (
      <div className="flex items-center border-b border-neutralWhite-400 overflow-hidden">
         {sectionOrder.map((section) => (
            <button
               onClick={() => handleTabClick(section)}
               className={`h5 ${type === section ? 'text-neutralBlack-900' : 'text-neutralBlack-600'} hover:bg-neutralWhite-400 cursor-pointer px-5 py-3 transition-colors`}
               key={section}
            >
               {sectionTitles[section]}
            </button>
         ))}
      </div>
   );
};

export default SearchTabs;
