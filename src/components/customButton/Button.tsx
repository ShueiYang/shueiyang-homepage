"use client";

import Link from "next/link";
import Image from "next/image";
import { RiMailSendFill } from "react-icons/ri";
import { DirectionType } from "@/providers/DirectionProvider";

export interface ButtonProps {
  children: React.ReactNode;
  path: string;
  goMail?: boolean;
  setMotion?: (value: DirectionType) => void;
}

const Button = ({ children, goMail, path, setMotion }: ButtonProps) => {
  return (
    <div className="my-4 flex justify-center">
      <Link
        href={path}
        scroll={true} // set to true since Exit animation not working
      >
        <button
          className="btn-primary flex items-center"
          onClick={() => {
            setMotion && setMotion("top");
          }} // change direction for the homepage exit animation
        >
          {goMail && <RiMailSendFill className="mr-3 text-xl" />}
          {children}
          {!goMail && (
            <Image
              className="ml-2 invert dark:invert-0"
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
