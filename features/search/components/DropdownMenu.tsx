import { useRouter } from 'next/navigation';
import { useDropdownSearch } from '../hooks/useDropdownSearch';
import { DropdownItem, sectionOrder, sectionTitles } from '../types/responce';
import qs from 'query-string';

const DropdownMenu = ({
   query,
   className,
}: {
   query: string;
   className: string;
}) => {
   const router = useRouter();
   const { data, isLoading } = useDropdownSearch(query);
   if (!data) return null;
   const hasResults = sectionOrder.some((section) => data[section].length > 0);

   if (!hasResults) return null;

   return (
      <div className={`${className} card py-2`}>
         {sectionOrder.map((section) => {
            const items = data[section];
            if (!items.length) return null;

            return (
               <div
                  key={section}
                  className="flex flex-col items-start gap-4 w-full"
               >
                  <div className="h5 text-neutralBlack-600 w-full">
                     <div className="px-4">{sectionTitles[section]}</div>

                     <div className="w-full mt-2">
                        {items.map((item: DropdownItem) => {
                           const newUrl = qs.stringifyUrl({
                              url: '/search',
                              query: {
                                 q: item.primary,
                                 type: section,
                                 limit: 10,
                                 page: 1,
                              },
                           });
                           return (
                              <div
                                 onClick={() => router.push(newUrl)}
                                 key={item.id}
                                 className="px-8 py-2 cursor-pointer hover:bg-neutralWhite-400 transition-colors"
                              >
                                 <div className="textBody text-neutralBlack-900">
                                    {item.primary}
                                 </div>
                                 <div className="textLabel text-neutralBlack-600">
                                    {item.secondary}
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default DropdownMenu;
