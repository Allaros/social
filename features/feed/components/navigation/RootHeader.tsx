import ROUTES from '@/shared/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icons/Logomark-2.svg';
import GlobalSearch from '@/features/search/GlobalSearch';
import AccountButtons from './AccountButtons';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import CustomButton from '@/shared/components/CustomButton';
import SendIcon from '@/public/icons/Send.svg';
import Logo2 from '@/public/icons/Logomark.svg';
const RootHeader = () => {
   const isMobile = useIsMobile();

   return (
      <div className="fixed w-full top-0 left-0 bg-neutralWhite-100 z-10">
         <nav className="grid max-w-7xl mx-auto grid-cols-[3fr_6fr_3fr]  max-lg:grid-cols-[3fr_5fr_3fr] gap-1.5 max-md:grid-cols-2 items-center py-4.5 px-6 box-border">
            <Link className="flex items-center gap-3" href={ROUTES.home}>
               <Image
                  src={isMobile ? Logo2 : Logo}
                  alt="Logo"
                  width={isMobile ? 32 : 40}
                  height={isMobile ? 32 : 40}
               ></Image>
               <p className="font-manrope text-[18px]">Social</p>
            </Link>
            {isMobile ? (
               <>
                  <CustomButton
                     className="justify-self-end p-1.5"
                     imageSrc={SendIcon}
                     alt="messages"
                     h={20}
                     w={20}
                     buttonFunc={() => console.log('clicked')}
                  />
               </>
            ) : (
               <>
                  <GlobalSearch />
                  <AccountButtons className="justify-self-end" />
               </>
            )}
         </nav>
      </div>
   );
};

export default RootHeader;
