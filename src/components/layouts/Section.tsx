"use client";

import { motion } from "framer-motion";

export interface SectionProps {
  children: React.ReactNode;
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      className="mx-auto mb-6 md:max-w-[80%]"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};
