"use client";

import Image from "next/image"
import PageLayout from "@/components/layouts/PageLayout"
import HeroTitle from "@/components/resume/HeroTitle"
import { HeroSection, Section } from "@/components/layouts/Section"
import Button from "@/components/customButton/Button"
import { useState } from "react"


export default function HomepageLayout({
    children
  }: {
    children: React.ReactNode
  }) {
  const [motionDirection, setMotionDirection] = useState<string | undefined>();
    
  // client side wrapper for the homePage 
  return (
    <PageLayout direction={motionDirection}>
      <article className="container xl:max-w-5xl">
        <div className="flex flex-col md:flex-row sm:max-w-[95%] md:max-w-[80%] lg:max-w-2xl items-center justify-center gap-[5%] mb-3 mx-auto">
          <div className="grow rounded-lg text-center md:text-left bg-sand-l dark:bg-sea-d p-5 mt-5 md:px-7">  
            <h1 className="font-ibm font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-wide">
              <HeroTitle />
                <HeroSection delay={1.5}>
                  <span className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-teal-600 dark:text-teal-400 ml-1">
                    KIM
                  </span>
                </HeroSection>
              <p className="font-medium text-lg sm:text-xl lg:text-[1.3rem] md: mt-2">
                Un développeur passionné par l&apos;apprentissage et 
                la création dans le domaine du web.
              </p>
            </h1>
          </div>
          <div className="shrink-0 mt-4 sm:mt-0 ">
            <Image src="/images/kim.png"
              className="border-neutral-300 mt-6 md:mt-4 border-2 border-solid rounded-full inline-block"
              width={100} 
              height={100} 
              alt="profile Image"
            />
          </div>
        </div>

          {children}
        
        <Section delay={0.8}>
          <h2 className="section"> 
            Contact
          </h2>
          <p className="text-center tracking-wide">
            Pour entrer en contact et pour tout renseignement complémentaire,
            <span className="block">cela se passe ici</span> 
          </p>
          <Image 
            src="/icons/chevronDown.svg"
            alt="chevrondouble-downIcon" 
            width={20}
            height={20}
            className="mx-auto mt-4 dark:invert animate-bounce"
          />  
          <Button 
            path="/contact"
            goMail={true}
            setMotion={(d)=> setMotionDirection(d)}
          >
            Me contacter
          </Button>
        </Section>    
      </article>
    </PageLayout>
  )
};