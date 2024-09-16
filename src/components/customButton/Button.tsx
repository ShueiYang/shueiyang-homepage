"use client";

import Link from "next/link";
import Image from "next/image";
import { RiMailSendFill } from "react-icons/ri";

export type ButtonProps = {
  children: React.ReactNode;
  path: string;
  goMail?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, goMail, path }) => {
  return (
    <div className="my-4 flex justify-center">
      <Link href={path} scroll={false}>
        <button
          className="btn-primary flex items-center"
          onClick={() => {}} // TODO: Trigger specific animation on exit.
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
