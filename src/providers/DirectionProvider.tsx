"use client";

import { createContext, useState } from "react";

export type DirectionType = "top" | "bottom" | "left" | "right";

interface DirectionContextValue {
  motionDirection: DirectionType | undefined
  setMotionDirection: React.Dispatch<React.SetStateAction<DirectionType | undefined>>
}

//create context for motion animation direction
export const DirectionContext = createContext<DirectionContextValue>(
  {} as DirectionContextValue
);


export default function DirectionProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [ motionDirection, setMotionDirection ] = useState<DirectionType | undefined>();
    
  return (
    <DirectionContext.Provider value={{motionDirection, setMotionDirection}}>
      {children}
    </DirectionContext.Provider>
  )
};