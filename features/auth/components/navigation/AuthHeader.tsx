import Image from 'next/image';

const AuthHeader = () => {
   return (
      <div className="absolute top-0 left-0 w-full py-10 max-md:py-7">
         <div className="flex items-center gap-3 justify-center">
            <Image
               src={'/icons/Logomark.svg'}
               alt="Logo"
               width={32}
               height={32}
            />
            <p className="font-manrope text-[18px]">Social</p>
         </div>
      </div>
   );
};

export default AuthHeader;
