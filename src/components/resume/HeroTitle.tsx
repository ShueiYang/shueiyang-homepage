import { HeroSection } from "../layouts/Section";


const HeroTitle = () => {
    const title = "Hello, je suis"
    const titleArray = title.split("");
       
    return (
      <div className="inline-flex mr-2 sm:mr-3">
        {
          titleArray.map((letter, index) => {
            const timing = 0.1 + index * 0.1
              return (
                <HeroSection key={index} delay={timing}>
                    {letter === " " ? "\u00A0" : letter}
                </HeroSection>
              )
            }
          )
        }
      </div>
    )
  }
  export default HeroTitle;
                