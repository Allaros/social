export const createObserver = (
   onIntersect: (id: number, el: Element) => void,
   options?: IntersectionObserverInit
) => {
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (!entry.isIntersecting) return;

         const target = entry.target as HTMLElement;
         const id = Number(target.dataset.id);

         if (!id) return;

         onIntersect(id, target);

         observer.unobserve(target);
      });
   }, options);

   return observer;
};
