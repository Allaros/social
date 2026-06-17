import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { getContextMenuActions } from '../../helpers/get-context-menu-actions';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from '@/shared/components/ui/context-menu';

type Props = {
   children: React.ReactNode;
   actions: ReturnType<typeof getContextMenuActions>;
};

export function MessageMenu({ children, actions }: Props) {
   const isMobile = useIsMobile();

   if (isMobile) {
      return <>{children}</>;
   }

   return (
      <ContextMenu>
         <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

         <ContextMenuContent>
            {actions.map((action) => {
               const Icon = action.icon;
               return (
                  <ContextMenuItem
                     className="textBody hover:bg-neutralWhite-400 transition-colors flex items-center gap-2 cursor-pointer"
                     key={action.label}
                     onClick={action.onClick}
                  >
                     <Icon className="size-5 text-neutralBlack-500" />
                     {action.label}
                  </ContextMenuItem>
               );
            })}
         </ContextMenuContent>
      </ContextMenu>
   );
}
