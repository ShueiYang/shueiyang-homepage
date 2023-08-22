import { HeroSection } from "@/components/layouts/Section";


const HeroName = () => {
    const name = "KIM"
    const nameArray = name.split("");
       
    return (
      <div className="inline-flex text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-teal-600 dark:text-teal-400 ml-1">
        {
          nameArray.map((letter, index) => {
            const timing = 0.1 + index * 0.1
              return (
                <HeroSection key={index} type="top" delay={1.5 + timing}>
                  {letter}
                </HeroSection>
              )
            }
          )
        }
      </div>
    )
  }
  export default HeroName;