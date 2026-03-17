'use client';

import SearchTabs from '@/features/search/components/SearchTabs';
import { useGetSearchResults } from '@/features/search/hooks/useGetSearchResults';
import { SearchSections } from '@/features/search/types/responce';
import { useSearchParams } from 'next/navigation';
import { type } from 'os';

const SearchPage = () => {
   const searchParams = useSearchParams();

   const query = searchParams.get('q') ?? '';
   const type = (searchParams.get('type') ?? 'profiles') as SearchSections;
   const limit = Number(searchParams.get('limit') ?? 10);
   const page = Number(searchParams.get('page') ?? 1);

   const { data } = useGetSearchResults({
      limit,
      page,
      query,
      type,
   });

   console.log(data);
   return (
      <div className="card">
         <SearchTabs type={type as SearchSections} />
      </div>
   );
};

export default SearchPage;
