"use client";

import { motion } from "framer-motion"
import { transit } from "@/utils/motion";

type PageLayoutProps = {
    children: React.ReactNode;
    direction?: string;
}

const PageLayout = ({ children, direction }: PageLayoutProps) => {
        
  return (
    <motion.section
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={transit(direction)}
      transition={{ duration: 0.4, type: "easeInOut"}}
      className="relative"
    >
      {children}
    </motion.section>
  )
}
  
export default PageLayout;     