import Image from 'next/image';
import React from 'react';

const AuthButton = ({
   children,
   icon,
   alt,
   width,
   height,
}: {
   children: React.ReactNode;
   icon: string;
   alt: string;
   width: number;
   height: number;
}) => {
   return (
      <button className="flex cursor-pointer hover:bg-neutralWhite-300 transition-colors items-center gap-2 py-2.5 border rounded-sm border-neutralWhite-400 w-full justify-center">
         <Image src={icon} alt={alt} width={width} height={height} />
         <p className="text-neutralBlack-500 textBody">{children}</p>
      </button>
   );
};

export default AuthButton;
