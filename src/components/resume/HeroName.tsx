import { HeroSection } from "../layouts/HeroSection";

const HeroName = () => {
  const name = "KIM";
  const nameArray = name.split("");

  return (
    <div className="ml-1 inline-flex text-3xl font-bold text-teal-600 dark:text-teal-400 md:text-4xl lg:text-[2.5rem]">
      {nameArray.map((letter, index) => {
        const timing = 0.1 + index * 0.1;
        return (
          <HeroSection key={letter} direction="top" delay={1.5 + timing}>
            {letter}
          </HeroSection>
        );
      })}
    </div>
  );
};
export default HeroName;
