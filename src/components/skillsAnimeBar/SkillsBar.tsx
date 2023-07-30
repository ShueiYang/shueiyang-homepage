"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SKILLS_ARRAY } from "@/constants/skills.Index";
import AnimateSkillsBar from "./ScrollAnimation";


export default function SkillsBar() {

  const iconsRef = useRef<HTMLDivElement>(null);
  const [iconsRefWidth, setIconsRefWidth] = useState<number>(0);

  useEffect(() => {
    if(iconsRef.current) {
      const width = iconsRef.current.scrollWidth;
      setIconsRefWidth(width);
    }
  }, []);
  

  return (
    <AnimateSkillsBar baseVelocity={-50} childWidth={iconsRefWidth}>
      <div className="flex " ref={iconsRef}>
        { SKILLS_ARRAY.map((skill) => {
          return (
            <div key={skill.name} className="w-[4.5rem]">
              <Image
                src={skill.path}
                className="max-w-none mx-auto w-8 sm:w-10 mt-2"
                alt={skill.name}
                loading="lazy"
                placeholder="blur"
                blurDataURL={skill.path}
                width={50}
                height={50} 
              />
              <p className="text-center text-xs mb-3">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </AnimateSkillsBar>
  );
};              