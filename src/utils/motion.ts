import { DirectionType } from "@/providers/DirectionProvider";
import { Variants } from "framer-motion";

// Framer motion animation

export function transit(direction?: DirectionType): Variants {
  return {
    hidden: {
      opacity: 0,
      x: 0,
      y: 25,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: 0,
      y: direction === "top" ? "-20%" : 25,
    },
  };
}

export function letterAnimate(
  direction: DirectionType,
  delay: number,
): Variants {
  const startPosition = 170 - delay * 12;

  return {
    hidden: {
      opacity: 0,
      x: direction === "top" ? 0 : startPosition,
      y: direction === "top" ? -81 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
}

export function slideIn(
  direction: DirectionType,
  type: string,
  delay: number,
): Variants {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
      transition: {
        type: type,
        delay: delay,
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };
}
