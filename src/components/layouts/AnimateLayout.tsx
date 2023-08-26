"use client";

import { PropsWithChildren, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation"
import { scrollAfterLoad } from "@/utils/utility";
import { transit } from "@/utils/motion"
// import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";

// not working for now...

// function FrozenRouter(props: PropsWithChildren<{}>) {
//   const context = useContext(LayoutRouterContext);
//   const frozen = useRef(context).current;

//   return (
//     <LayoutRouterContext.Provider value={frozen}>
//       {props.children}
//     </LayoutRouterContext.Provider>
//   );
// }


// export default function AnimationLayout(props : PropsWithChildren<{}>) {
//   const pathName = usePathname();

//   return (
//     <AnimatePresence
//       initial={true}
//       mode="wait" 
//       onExitComplete={()=>{scrollAfterLoad()}}
//     >
//       <motion.section
//         key={pathName}
//         initial="hidden"
//         animate="enter"
//         exit="exit"
//         variants={transit()}
//         transition={{ duration: 0.4, type: "easeInOut"}}
//         className="relative"
//       >
//         {/* <FrozenRouter> */}
//           {props.children}
//         {/* </FrozenRouter> */}
//       </motion.section>
//     </AnimatePresence>  
//   )
// };