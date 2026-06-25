import {
   differenceInMinutes,
   format,
   isThisYear,
   isToday,
   isYesterday,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatPostDate(createdAt: Date | string): string {
   const now = new Date();
   const date = new Date(createdAt);

   const diffMs = now.getTime() - date.getTime();
   const diffSec = Math.floor(diffMs / 1000);

   if (diffSec < 120) return 'недавно';

   const minutes = Math.floor(diffSec / 60);
   if (minutes < 60) {
      return `${minutes} ${plural(minutes, 'минута', 'минуты', 'минут')} назад`;
   }

   const hours = Math.floor(minutes / 60);
   if (hours < 24) {
      return `${hours} ${plural(hours, 'час', 'часа', 'часов')} назад`;
   }

   const days = Math.floor(hours / 24);
   if (days < 30) {
      return `${days} ${plural(days, 'день', 'дня', 'дней')} назад`;
   }

   const months = Math.floor(days / 30);
   if (months < 12) {
      return `${months} ${plural(months, 'месяц', 'месяца', 'месяцев')} назад`;
   }

   const years = Math.floor(months / 12);
   return `${years} ${plural(years, 'год', 'года', 'лет')} назад`;
}

function plural(value: number, one: string, few: string, many: string): string {
   const mod10 = value % 10;
   const mod100 = value % 100;

   if (mod10 === 1 && mod100 !== 11) return one;
   if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
   return many;
}

type FormatLastSeenParams = {
   isOnline: boolean;
   lastSeenAt?: string | Date | null;
};

export function formatLastSeen({
   isOnline,
   lastSeenAt,
}: FormatLastSeenParams): string {
   if (isOnline) {
      return 'в сети';
   }

   if (!lastSeenAt) {
      return 'был(а) давно';
   }

   const date =
      typeof lastSeenAt === 'string' ? new Date(lastSeenAt) : lastSeenAt;

   const now = new Date();

   const minutes = differenceInMinutes(now, date);

   // только что
   if (minutes < 1) {
      return 'был(а) только что';
   }

   // менее часа
   if (minutes < 60) {
      return `был(а) ${pluralizeMinutes(minutes)} назад`;
   }

   // сегодня
   if (isToday(date)) {
      return `был(а) сегодня в ${format(date, 'HH:mm')}`;
   }

   // вчера
   if (isYesterday(date)) {
      return `был(а) вчера в ${format(date, 'HH:mm')}`;
   }

   // в этом году
   if (isThisYear(date)) {
      return `был(а) ${format(date, 'd MMM', { locale: ru })} в ${format(date, 'HH:mm', { locale: ru })}`;
   }

   // старые даты
   return `был(а) ${format(date, 'd MMM yyyy', { locale: ru })} в ${format(date, 'HH:mm')}`;
}

type FormatRestrictedUntilParams = {
   restrictedUntil: Date | string | null;
};

export function formatRestrictedUntil({
   restrictedUntil,
}: FormatRestrictedUntilParams): string | null {
   if (!restrictedUntil) {
      return null;
   }

   const date =
      typeof restrictedUntil === 'string'
         ? new Date(restrictedUntil)
         : restrictedUntil;

   const now = new Date();

   const yearsDiff = date.getFullYear() - now.getFullYear();

   if (yearsDiff >= 50) {
      return 'Исключён навсегда';
   }

   if (isThisYear(date)) {
      return `Исключён до ${format(date, 'd MMM', {
         locale: ru,
      })} ${format(date, 'HH:mm')}`;
   }

   return `Исключён до ${format(date, 'd MMM yyyy', {
      locale: ru,
   })} ${format(date, 'HH:mm')}`;
}

function pluralizeMinutes(minutes: number): string {
   const mod10 = minutes % 10;
   const mod100 = minutes % 100;

   if (mod10 === 1 && mod100 !== 11) {
      return `${minutes} минуту`;
   }

   if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return `${minutes} минуты`;
   }

   return `${minutes} минут`;
}

export const formatMessageTime = (date: string | Date): string => {
   return new Date(date).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
   });
};
