"use client";

/* eslint-disable  @typescript-eslint/no-unused-vars */

// import { PropsWithChildren, useContext, useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { scrollAfterLoad } from "@/utils/utility";
// import { transit } from "@/utils/motion";
// import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// function FrozenRouter({ children }: PropsWithChildren) {
//   const context = useContext(LayoutRouterContext);
//   const frozen = useRef(context).current;

//   return (
//     <LayoutRouterContext.Provider value={frozen}>
//       {children}
//     </LayoutRouterContext.Provider>
//   );
// }

// export default function AnimationLayout({ children }: PropsWithChildren) {
//   const pathName = usePathname();

//   return (
//     <AnimatePresence
//       // initial={true}
//       mode="wait"
//       onExitComplete={()=>{scrollAfterLoad()}}
//     >
//       <motion.div
//         key={pathName}
//         initial="hidden"
//         animate="enter"
//         exit="exit"
//         variants={transit()}
//         transition={{ duration: 0.4, type: "easeInOut"}}
//         className="relative"
//       >
//         <FrozenRouter>
//           {children}
//         </FrozenRouter>
//       </motion.div>
//     </AnimatePresence>
//   )
// };
