import Image from "next/image";
import Link from "next/link";

interface PrevLinkProps {
    children: React.ReactNode;
    path: string;
    style?: string 
}

const PreviousLink = ({children, path, style }: PrevLinkProps) => {

  return (
    <div className={`flex text-lg md:max-w-[44rem] ${style}`}>
        <div className="mr-1 my-auto">
          <Image 
            className="dark:invert"
            src="/icons/chevronLeft.svg"
            width={17}
            height={17}
            alt="chevron-leftIcon"
          />
        </div>
        <Link 
            href={path}
            scroll={false} 
            className="z-20 text-blue-600 dark:text-teal-300 hover:underline underline-offset-4"
        >
            {children}
        </Link>
    </div>
  )
}
export default PreviousLink;