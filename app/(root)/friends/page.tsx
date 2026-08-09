'use client';

import FriendsSearch from '@/features/friends/components/FriendsSearch';
import RelationsTabs from '@/features/friends/components/navigation/RelationsTabs';
import RelationsFeed from '@/features/friends/components/RelationsFeed';
import { useRelations } from '@/features/friends/hooks/useGetRelations';
import { RelationType } from '@/features/friends/types/friends.interface';
import { useDebounce } from '@/shared/utils/debounce';
import { FriendsSearchSchema } from '@/shared/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

type FormValues = z.infer<typeof FriendsSearchSchema>;

const FriendsPageContent = () => {
   const [tab, setTab] = useState<RelationType>('friends');
   const form = useForm<FormValues>({
      resolver: zodResolver(FriendsSearchSchema),

      defaultValues: {
         query: '',
      },
   });

   const query = form.watch('query');

   const debouncedQuery = useDebounce(query, 300);

   const relations = useRelations({
      type: tab,
      query: debouncedQuery,
   });

   return (
      <div className="card">
         <FriendsSearch form={form} />
         <RelationsTabs setTab={setTab} currentTab={tab} />
         <RelationsFeed relationsQuery={relations} />
      </div>
   );
};

const FriendsPage = () => {
   return (
      <Suspense fallback={null}>
         {' '}
         <FriendsPageContent />{' '}
      </Suspense>
   );
};

export default FriendsPage;
