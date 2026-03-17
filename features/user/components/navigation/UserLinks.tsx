'use client';
import { useMe } from '@/features/auth/hooks/useMe';
import CustomButton from '@/shared/components/CustomButton';
import { UserLinksInterface } from '@/features/user/constants/UserLinksData';

const UserLinks = ({
   linksData,
   isMobile = false,
}: {
   linksData: UserLinksInterface[];
   isMobile: boolean;
}) => {
   const { data: user } = useMe();

   const getHref = (link: UserLinksInterface) => {
      if (link.alt === 'Profile link') {
         return link.isLink(user?.profile?.username);
      }

      return link.isLink();
   };

   if (isMobile) {
      return (
         <ul className="py-4.5 px-8.5 flex items-center gap-16.5 ">
            {linksData.map((link) => {
               const href = getHref(link);
               return (
                  <li key={link.alt}>
                     <CustomButton
                        className="block p-2 hover:bg-neutralWhite-400"
                        h={20}
                        w={20}
                        {...link}
                        isLink={href}
                     ></CustomButton>
                  </li>
               );
            })}
         </ul>
      );
   }
   return (
      <ul className="pb-8">
         {linksData.map((link, index) => {
            const href = getHref(link);

            return (
               <li key={link.alt} className="relative">
                  <CustomButton
                     className="flex max-lg:px-4 px-8 gap-2.5 items-center py-3.5 textBody-medium text-neutralBlack-600 hover:bg-neutralWhite-400 transition-colors"
                     h={20}
                     w={20}
                     {...link}
                     isLink={href}
                  />
                  {index !== linksData.length - 1 && (
                     <div className="h-px bg-neutralWhite-400 mx-8 max-lg:mx-4"></div>
                  )}
               </li>
            );
         })}
      </ul>
   );
};

export default UserLinks;
