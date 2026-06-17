import React from 'react';
import { getMessageDateLabel } from '../utils/get-message-date';

const DateDivider = ({ date }: { date: string }) => (
   <div className="flex justify-center py-2">
      <span className="rounded-full bg-neutralWhite-200 px-3 py-1 text-xs text-neutralWhite-700">
         {getMessageDateLabel(date)}
      </span>
   </div>
);

export default DateDivider;
