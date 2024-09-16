"use client";

import { motion, useAnimation } from "framer-motion";
import { DirectionType, letterAnimate } from "@/utils/motion";
import { SectionProps } from "./Section";
import { useContext, useEffect } from "react";
import { TransitionContext } from "@/providers/TransitionProvider";

interface HeroSectionProps extends SectionProps {
  direction: DirectionType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  direction = "left",
  delay = 0,
}) => {
  const { isFirstVisit, setIsFirstVisit } = useContext(TransitionContext);
  const controls = useAnimation();

  /**
   *  Trigger animation intro only on the first load.
   */
  useEffect(() => {
    async function animateIntro() {
      controls.set("hidden");
      await controls.start("visible");
      setIsFirstVisit(false);
    }

    if (isFirstVisit) {
      animateIntro();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstVisit]);

  return (
    <motion.div
      className="inline-flex"
      animate={controls}
      variants={letterAnimate(direction, delay)}
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
