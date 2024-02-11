"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { DirectionType } from "@/providers/DirectionProvider";
import { ThemeContext } from "@/providers/ThemeProvider";

import PageLayout from "@/components/layouts/PageLayout";
import HeroTitle from "@/components/resume/HeroTitle";
import { Section } from "@/components/layouts/Section";
import Button from "@/components/customButton/Button";
import HeroName from "./HeroName";

export default function HomepageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [motionDirection, setMotionDirection] = useState<
    DirectionType | undefined
  >();
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Fix the Hydration issue with server component to
  // correctly display the dark theme gradient color on first load.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // client side wrapper for the homePage
  return (
    <PageLayout direction={motionDirection}>
      <article className="container xl:max-w-5xl">
        <div className="mx-auto mb-3 flex flex-col items-center justify-center gap-[5%] sm:max-w-[95%] md:max-w-[80%] md:flex-row lg:max-w-2xl">
          {isMounted ? (
            <div
              className={`${theme === "light" ? "bg-gradient-to-r from-sand-l to-[#ece6b3]" : "from-[#30375e] to-sea-d dark:bg-gradient-to-r"}
            mt-5 grow rounded-lg p-5 text-center md:px-7 md:text-left`}
            >
              <h1 className="font-ibm text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl">
                <HeroTitle />
                <HeroName />
                <p className="md: mt-2 font-robo text-lg font-medium sm:text-xl lg:text-[1.3rem]">
                  Un développeur passionné par l&apos;apprentissage et la
                  création dans le domaine du web.
                </p>
              </h1>
            </div>
          ) : (
            <div />
          )}
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

        {children}

        <Section delay={0.8}>
          <h2 className="section">Contact</h2>
          <p className="text-center tracking-wide">
            Pour entrer en contact et pour tout renseignement complémentaire,{" "}
            <span className="block">cela se passe ici</span>
          </p>
          <Image
            src="/icons/chevronDown.svg"
            alt="chevrondouble-downIcon"
            width={20}
            height={20}
            className="mx-auto mt-4 animate-bounce dark:invert"
          />
          <Button
            path="/contact"
            goMail={true}
            setMotion={(d) => setMotionDirection(d)}
          >
            Me contacter
          </Button>
        </Section>
      </article>
    </PageLayout>
  );
}
