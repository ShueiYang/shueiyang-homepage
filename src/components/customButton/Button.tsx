"use client";

import Link from "next/link";
import Image from "next/image";
import { RiMailSendFill } from "react-icons/ri";

export interface ButtonProps {
  children: React.ReactNode;
  path: string;
  goMail?: boolean;
  setMotion?: (value: string) => void;
}


const Button = ({ children, goMail, path, setMotion }: ButtonProps) => {

  return (
    <div className="flex justify-center my-4">
      <Link href={path} scroll={false}>
        <button
          className="btn-primary flex items-center"
          onClick={() => {
            setMotion && setMotion("up");
          }} // change direction for the homepage exit animation
        >
          {goMail && <RiMailSendFill className="mr-3 text-xl" />}
          {children}
          {!goMail && (
            <Image
              className="invert dark:invert-0 ml-2"
              src={"/icons/chevronRight.svg"}
              width={18}
              height={18}
              alt="chevron-rightIcon"
            />
          )}
        </button>
      </Link>
    </div>
  );
};

export default Button;