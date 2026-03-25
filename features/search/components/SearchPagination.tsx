'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ChevronLeft from '@/public/icons/Chevron Left.svg';
import Image from 'next/image';
import { useEffect } from 'react';

type PageItem = number | 'dots';

function getFixedPaginationItems(
   currentPage: number,
   totalPages: number,
   maxLength: number = 5
): PageItem[] {
   const items: PageItem[] = [];

   if (totalPages <= maxLength) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
      return items;
   }

   const middleCount = maxLength - 2;
   let start = Math.max(2, currentPage - Math.floor(middleCount / 2));
   let end = start + middleCount - 1;

   if (end >= totalPages) {
      end = totalPages - 1;
      start = end - middleCount + 1;
   }

   items.push(1);

   if (start > 2) items.push('dots');

   for (let i = start; i <= end; i++) {
      items.push(i);
   }

   if (end < totalPages - 1) items.push('dots');

   items.push(totalPages);

   return items;
}

const SearchPagination = ({
   total,
   limit,
   page,
}: {
   total: number;
   limit: number;
   page: number;
}) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const totalPages = Math.ceil(total / limit);

   const changePage = (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(newPage));

      router.push(`/search?${params.toString()}`);

      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
         if (e.key === 'ArrowLeft' && page !== 1) changePage(page - 1);
         if (e.key === 'ArrowRight' && page !== totalPages)
            changePage(page + 1);
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
   }, [page, totalPages]);

   if (totalPages <= 1) return null;

   const paginationItems = getFixedPaginationItems(page, totalPages);

   return (
      <div className="flex gap-2 mt-4 justify-center items-center">
         <button
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className={`${page === 1 ? 'cursor-default bg-neutralWhite-400' : 'cursor-pointer'} hover:bg-neutralWhite-400 p-0.5 rounded-sm transition-colors`}
         >
            <Image
               src={ChevronLeft}
               height={20}
               width={20}
               alt="Previous page"
            />
         </button>

         {paginationItems.map((item, index) =>
            item === 'dots' ? (
               <span key={`dots-${index}`} className="px-1">
                  ...
               </span>
            ) : (
               <button
                  key={item}
                  onClick={() => changePage(item)}
                  className={`${item === page ? 'text-neutralBlack-900 textBody-medium' : 'text-neutralBlack-600 textBody'}  hover:bg-neutralWhite-400  rounded-sm cursor-pointer w-6 h-6 flex items-center justify-center`}
               >
                  {item}
               </button>
            )
         )}

         <button
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
            className={`${page === totalPages ? 'cursor-default bg-neutralWhite-400' : 'cursor-pointer'} hover:bg-neutralWhite-400 cursor-pointer p-0.5 rounded-sm transition-colors`}
         >
            <Image
               src={ChevronLeft}
               height={20}
               width={20}
               alt="Next page"
               className="rotate-180"
            />
         </button>
      </div>
   );
};

export default SearchPagination;
