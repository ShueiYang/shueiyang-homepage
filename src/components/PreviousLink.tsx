import Image from "next/image";
import Link from "next/link";

interface PrevLinkProps {
  children: React.ReactNode;
  path: string;
  style?: string;
}

const PreviousLink: React.FC<PrevLinkProps> = ({ children, path, style }) => {
  return (
    <div className={`flex text-lg md:max-w-[44rem] ${style}`}>
      <div className="my-auto mr-1">
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
        className="z-20 text-blue-600 underline-offset-4 hover:underline dark:text-teal-300"
      >
        {children}
      </Link>
    </div>
  );
};
export default PreviousLink;
