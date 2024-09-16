import { ValueAnimationTransition, Variants } from "framer-motion";

// Framer motion variant animation.

export type DirectionType = "top" | "bottom" | "left" | "right";

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

export const exitTransitionOptions: ValueAnimationTransition = {
  type: "tween",
  duration: 0.5,
  ease: "easeIn",
  delay: 0.2,
};

/**
 * Generates animation variants for a slide-in effect based on the specified direction.
 *
 * @param direction - The direction from which the element should slide in.
 * @returns Animation variants with initial hidden state for sliding in.
 */
export function slideIn(direction: DirectionType): Variants {
  const getPosition = (axis: "x" | "y"): string | 0 => {
    if (axis === "x") {
      if (direction === "left") return "-100%";
      if (direction === "right") return "100%";
      return 0;
    } else {
      if (direction === "top") return "-100%";
      if (direction === "bottom") return "100%";
      return 0;
    }
  };

  return {
    hidden: {
      opacity: 0,
      x: getPosition("x"),
      y: getPosition("y"),
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };
}
