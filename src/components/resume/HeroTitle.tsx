import { HeroSection } from "../layouts/HeroSection";

export default function HeroTitle() {
  const title = "Hello, je suis";
  const titleArray = title.split("");

  return (
    <div className="mr-2 inline-flex sm:mr-3">
      {titleArray.map((letter, index) => {
        const timing = 0.1 + index * 0.1;
        return (
          <HeroSection
            key={`uniq-${String.fromCharCode(index + 65)}`}
            direction="left"
            delay={timing}
          >
            {letter === " " ? "\u00A0" : letter}
          </HeroSection>
        );
      })}
    </div>
  );
}
