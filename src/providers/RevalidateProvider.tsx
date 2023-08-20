"use client";

import { createContext, useState } from "react";

interface RevalidateContextValue {
  revalidate: boolean
  setRevalidate: React.Dispatch<React.SetStateAction<boolean>>
}

export const RevalidateContext = createContext<RevalidateContextValue>(
  {} as RevalidateContextValue
);


export default function RevalidateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [ revalidate, setRevalidate ] = useState(false);

  return (
    <RevalidateContext.Provider value={{revalidate, setRevalidate}}>
      {children}
    </RevalidateContext.Provider>
  )
};