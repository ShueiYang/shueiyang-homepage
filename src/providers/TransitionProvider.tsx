"use client";

import { DirectionType } from "@/utils/motion";
import { createContext, useState } from "react";

type TransitionContextValue = {
  isFirstVisit: boolean;
  setIsFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
  motionDirection: DirectionType;
  setMotionDirection: React.Dispatch<React.SetStateAction<DirectionType>>;
};

export const TransitionContext = createContext<TransitionContextValue>(
  {} as TransitionContextValue,
);

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [motionDirection, setMotionDirection] =
    useState<DirectionType>("bottom");

  return (
    <TransitionContext.Provider
      value={{
        isFirstVisit,
        setIsFirstVisit,
        motionDirection,
        setMotionDirection,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
