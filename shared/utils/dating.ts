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
