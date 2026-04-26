import { useRouter } from 'next/navigation';
import { useDropdownSearch } from '../hooks/useDropdownSearch';
import { DropdownItem, sectionOrder, sectionTitles } from '../types/response';
import qs from 'query-string';
import Image from 'next/image';
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/shared/components/ui/avatar';
import UnknownIco from '@/public/icons/Incognito.svg';

const SearchDropdownMenu = ({
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
                                 q:
                                    item.type === 'profile'
                                       ? item.primary
                                       : query,
                                 type: section,
                                 limit: 10,
                                 page: 1,
                              },
                           });
                           return (
                              <div
                                 onClick={() => router.push(newUrl)}
                                 key={item.id}
                                 className="px-8 py-2 flex items-center gap-4 cursor-pointer hover:bg-neutralWhite-400 transition-colors"
                              >
                                 <div>
                                    <Avatar className="size-10">
                                       <AvatarImage
                                          src={item.avatarUrl}
                                          alt="profile avatar"
                                       />
                                       <AvatarFallback>
                                          <Image
                                             src={UnknownIco}
                                             height={40}
                                             width={40}
                                             alt="profile avatar"
                                          />
                                       </AvatarFallback>
                                    </Avatar>
                                 </div>
                                 <div>
                                    <div className="textBody text-neutralBlack-900 line-clamp-1">
                                       {item.primary}
                                    </div>
                                    <div className="textLabel text-neutralBlack-600">
                                       {item.secondary}
                                    </div>
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

export default SearchDropdownMenu;
