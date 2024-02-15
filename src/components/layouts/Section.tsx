"use client";

import { motion } from "framer-motion";
import { transit, letterAnimate } from "@/utils/motion";

export interface SectionProps {
  children: React.ReactNode;
  delay?: number;
  type?: string;
}

export const Section = ({ children, delay = 0 }: SectionProps) => {
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

export const HeroSection = ({ children, type, delay = 0 }: SectionProps) => {
  return (
    <motion.div
      className="inline-flex"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={type === "top" ? letterAnimate("top") : letterAnimate("left")}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 50,
        damping: 13,
      }}
    >
      {children}
    </motion.div>
  );
};

export const ModalSection = ({ children }: SectionProps) => {
  return (
    <motion.div
      className="container relative mt-6 md:mt-[10%] xl:max-w-5xl"
      exit="exit"
      variants={transit()}
      transition={{ duration: 0.4, type: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
