export function buildNames(actors: { name: string }[]) {
   if (actors.length === 1) return actors[0].name;

   if (actors.length === 2) {
      return `${actors[0].name} и ${actors[1].name}`;
   }

   if (actors.length === 3) {
      return `${actors[0].name}, ${actors[1].name} и ${actors[2].name}`;
   }

   return `${actors[0].name}, ${actors[1].name}, ${actors[2].name}`;
}
