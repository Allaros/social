import { isToday, isYesterday, format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const getMessageDateLabel = (date: string | Date) => {
   const parsedDate = new Date(date);

   if (isToday(parsedDate)) {
      return 'Сегодня';
   }

   if (isYesterday(parsedDate)) {
      return 'Вчера';
   }

   return format(parsedDate, 'd MMMM', {
      locale: ru,
   });
};
