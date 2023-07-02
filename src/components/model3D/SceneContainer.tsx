import { forwardRef } from "react"
import { SectionProps } from "../layouts/Section"


const SceneContainer = forwardRef<HTMLDivElement, SectionProps>(({children}, ref)=> {
   
  return ( 
    <div 
      ref={ref}
      className="relative mx-auto -mt-5 sm:-mt-14 md:-mt-28 -mb-10 sm:-mb-32 md:-mb-44 w-72 sm:w-[30rem] md:w-[40rem] h-72 sm:h-[30rem] md:h-[40rem]"
    >
      {children}
    </div>
  )
})
SceneContainer.displayName = "SceneContainer";

export default SceneContainer;           