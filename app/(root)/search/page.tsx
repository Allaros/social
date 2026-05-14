'use client';

import Post from '@/features/post/components/Post';
import { PostResponse } from '@/features/post/types/post.responce';
import { ProfileListItem } from '@/features/profile/types/profile.interface';
import ProfileSearchItem from '@/features/search/components/searchItems/ProfileSearchItem';
import SearchPagination from '@/features/search/components/SearchPagination';
import SearchTabs from '@/features/search/components/SearchTabs';
import { useGetSearchResults } from '@/features/search/hooks/useGetSearchResults';
import { SearchSections } from '@/features/search/types/response';
import { useSearchParams } from 'next/navigation';

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
   if (!data) return null;

   const { data: results, meta } = data;

   const { total } = meta;

   console.log(results);
   return (
      <div className="card">
         <SearchTabs type={type as SearchSections} />
         <SearchPagination total={total} limit={limit} page={page} />
         <div className="flex flex-col my-6 max-md:my-4">
            {type === 'profiles' &&
               results.map((item: ProfileListItem) => (
                  <ProfileSearchItem key={item.id} profile={item} />
               ))}
            {type === 'posts' &&
               results.map((item: PostResponse) => (
                  <Post post={item} key={item.id} />
               ))}
         </div>
         <SearchPagination total={total} limit={limit} page={page} />
      </div>
   );
};

export default SearchPage;
