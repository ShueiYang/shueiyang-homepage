"use client";

import { TransitionRouter } from "next-transition-router";
import { usePathname } from "next/navigation";
import { useAnimate } from "framer-motion";
import { exitTransitionOptions } from "@/utils/motion";

/**
 * Workaround for integrating exit animations with Next.js App Router using `next-transition-router`.
 *
 * - Ensures exit animations trigger properly before the route changes.
 * - Helps synchronize the exit animation lifecycle with the Next.js App Router,
 *   allowing for smoother transitions between routes.
 */
export default function AnimateTransitionRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [scope, animate] = useAnimate();

  async function enterTransit() {
    await animate(
      scope.current,
      { opacity: [0, 1], y: [25, 0] },
      { duration: 0.4 },
    );
  }

  async function exitTransit() {
    const successElement = document.querySelector("#successMail");

    if (pathName === "/contact" && !successElement) {
      await Promise.all([
        animate(
          "#contact",
          {
            opacity: [1, 0],
            x: [0, "-100%"],
          },
          exitTransitionOptions,
        ),
        animate(
          "#map",
          {
            opacity: [1, 0],
            x: [0, "100%"],
          },
          exitTransitionOptions,
        ),
      ]);
    } else {
      await animate(
        scope.current,
        { opacity: [1, 0], y: [0, 25] },
        { duration: 0.4 },
      );
    }
  }

  return (
    <TransitionRouter
      auto
      enter={async (next) => {
        await enterTransit();
        next();
      }}
      leave={async (next) => {
        await exitTransit();
        next();
      }}
    >
      <section ref={scope} className="relative">
        {children}
      </section>
    </TransitionRouter>
  );
}
