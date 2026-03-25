import { Check } from 'lucide-react';

interface Props {
   checked: boolean;
   onChange: (checked: boolean) => void;
   label?: string;
}

const Checkbox = ({ checked, onChange, label }: Props) => {
   return (
      <label className="flex items-center gap-2 cursor-pointer select-none">
         <div className="relative">
            <input
               type="checkbox"
               checked={checked}
               onChange={(e) => onChange(e.target.checked)}
               className="peer sr-only"
            />

            <div
               className="
               w-4 h-4 rounded border border-neutralBlack-300
               flex items-center justify-center
               transition-colors
               peer-checked:bg-primary-900
               peer-checked:border-primary-900
               "
            >
               <Check
                  size={14}
                  className="text-white opacity-0 peer-checked:opacity-100 transition"
               />
            </div>
         </div>

         {label && (
            <span className="text-sm text-neutralBlack-800">{label}</span>
         )}
      </label>
   );
};

export default Checkbox;
