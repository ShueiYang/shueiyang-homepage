"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SKILLS_ARRAY } from "@/constants/skills.Index";
import AnimateSkillsBar from "./ScrollAnimation";

export default function SkillsBar() {
  const iconsRef = useRef<HTMLDivElement>(null);
  const [iconsRefWidth, setIconsRefWidth] = useState<number>(0);

  useEffect(() => {
    if (iconsRef.current) {
      const width = iconsRef.current.scrollWidth;
      setIconsRefWidth(width);
    }
  }, []);

  return (
    <AnimateSkillsBar baseVelocity={-50} childWidth={iconsRefWidth}>
      <div className="flex " ref={iconsRef}>
        {SKILLS_ARRAY.map((skill) => {
          return (
            <div key={skill.name} className="w-[4.5rem]">
              <Image
                src={skill.path}
                className="mx-auto mt-2 w-8 max-w-none sm:w-10"
                alt={skill.name}
                loading="lazy"
                placeholder="blur"
                blurDataURL={skill.path}
                width={50}
                height={50}
              />
              <p className="mb-3 text-center text-xs">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </AnimateSkillsBar>
  );
}
