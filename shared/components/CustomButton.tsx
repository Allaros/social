import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const CustomButton = ({
   className,
   imageSrc,
   alt,
   w,
   h,
   buttonFunc,
   isLink,
   label,
}: {
   className?: string;
   imageSrc: string | StaticImageData;
   alt: string;
   w: number;
   h: number;
   buttonFunc?: () => void;
   isLink?: string;
   label?: string;
}) => {
   return (
      <>
         {isLink ? (
            <Link className={className} href={isLink}>
               <Image src={imageSrc} alt={alt} width={w} height={h} />
               {label && <p>{label}</p>}
            </Link>
         ) : (
            <button className={className} onClick={buttonFunc}>
               <Image src={imageSrc} alt={alt} width={w} height={h} />
               {label && <p>{label}</p>}
            </button>
         )}
      </>
   );
};

export default CustomButton;
