import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface AnimateProps {
  children: React.ReactNode;
  baseVelocity: number;
  childWidth: number;
}

export default function AnimateSkillsBar({
  children,
  childWidth,
  baseVelocity = 100,
}: Readonly<AnimateProps>) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /* Wrap the x motion value between -childWidth and 0 */
  const x = useTransform(baseX, (v) => wrap(-childWidth, 0, v));

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport.
   */

  return (
    <div className={`relative mt-3 overflow-hidden dark:bg-slate-700`}>
      <motion.div className="flex" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}
