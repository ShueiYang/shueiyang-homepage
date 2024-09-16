"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import HeroTitle from "@/components/resume/HeroTitle";
import HeroName from "./HeroName";

export default function HomeHeader() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="mx-auto mb-3 flex flex-col items-center justify-center gap-[5%] sm:max-w-[95%] md:max-w-[80%] md:flex-row lg:max-w-2xl">
      <div
        className={`${
          theme === "light"
            ? "bg-gradient-to-r from-sand-l to-[#ece6b3]"
            : "from-[#30375e] to-sea-d dark:bg-gradient-to-r"
        } mt-5 grow rounded-lg p-5 text-center md:px-7 md:text-left`}
      >
        <h1 className="font-ibm text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl">
          <HeroTitle />
          <HeroName />
          <p className="md: mt-2 font-robo text-lg font-medium sm:text-xl lg:text-[1.3rem]">
            Un développeur passionné par l&apos;apprentissage et la création
            dans le domaine du web.
          </p>
        </h1>
      </div>

      <div className="mt-4 shrink-0 sm:mt-0 ">
        <Image
          src="/images/kim.png"
          className="mt-6 inline-block rounded-full border-2 border-solid border-neutral-300 md:mt-4"
          width={100}
          height={100}
          alt="profile Image"
          priority
        />
      </div>
    </div>
  );
}
