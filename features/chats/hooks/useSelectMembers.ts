import { useCallback, useState } from 'react';

export const useSelectMembers = () => {
   const [selectedIds, setSelectedIds] = useState<number[]>([]);

   const toggle = useCallback((profileId: number) => {
      setSelectedIds((prev) =>
         prev.includes(profileId)
            ? prev.filter((id) => id !== profileId)
            : [...prev, profileId]
      );
   }, []);

   const clear = useCallback(() => {
      setSelectedIds([]);
   }, []);

   const isSelected = useCallback(
      (profileId: number) => selectedIds.includes(profileId),
      [selectedIds]
   );

   return {
      selectedIds,
      toggle,
      clear,
      isSelected,
   };
};
