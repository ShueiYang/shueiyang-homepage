"use client";

import { scrollAfterLoad } from "@/utils/utility";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"
import { Fragment, type PropsWithChildren } from "react";

// not working for now...

const AnimatePresenceLayout = ({children}: PropsWithChildren) => {
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

export default AnimatePresenceLayout;