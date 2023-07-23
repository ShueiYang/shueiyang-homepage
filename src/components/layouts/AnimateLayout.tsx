"use client";

import { scrollAfterLoad } from "@/utils/utility";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"
import { Fragment} from "react";

// not working for now...

const AnimateLayoutWrapper = ({children}: {children: React.ReactNode}) => {
  const pathName = usePathname();

  return (
    <AnimatePresence
        initial={true}
        mode="wait" 
        onExitComplete={()=>{scrollAfterLoad()}}
    >
      <Fragment key={pathName}>
        {children}
      </Fragment>
    </AnimatePresence>  
  )
}

export default AnimateLayoutWrapper;