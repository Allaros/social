import React from 'react';
import { Button } from './ui/button';
import {
   Empty,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
   EmptyDescription,
   EmptyContent,
} from './ui/empty';

import {
   EMPTY,
   EmptyAction,
   EmptyDataType,
   EmptyType,
} from '../constants/emptyData';
import Image from 'next/image';

const EmptyPage = ({ preset }: { preset: EmptyType }) => {
   const data: EmptyDataType = EMPTY[preset];

   return (
      <Empty>
         <EmptyHeader>
            {data.image && (
               <EmptyMedia variant="icon">
                  <Image
                     src={data.image}
                     alt="empty icon"
                     width={32}
                     height={32}
                  />
               </EmptyMedia>
            )}

            <EmptyTitle>{data.title}</EmptyTitle>
            {data.description && (
               <EmptyDescription>{data.description}</EmptyDescription>
            )}
         </EmptyHeader>
         <EmptyContent className="flex-row justify-center gap-2">
            {data.actions &&
               data.actions.map((action: EmptyAction) => {
                  if (action.href) {
                     return (
                        <Button key={action.label} variant={action.variant}>
                           <a href={action.href}>{action.label}</a>
                        </Button>
                     );
                  }

                  return (
                     <Button
                        key={action.label}
                        variant={action.variant}
                        onClick={action.onClick}
                     >
                        {action.label}
                     </Button>
                  );
               })}
         </EmptyContent>
      </Empty>
   );
};

export default EmptyPage;
