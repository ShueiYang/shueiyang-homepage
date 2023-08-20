"use client"

import { RevalidateContext } from "@/providers/RevalidateProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";


export default function DataRevalidator() {
  
  const router = useRouter();
  const { revalidate, setRevalidate } = useContext(RevalidateContext);
  console.log("check validate state", revalidate);
  

  useEffect(() => {
    console.log("TRIGGER USEEFFECT");
    
    if(revalidate) {
      console.log("Revalidation is Trigger")
      router.refresh();
      setRevalidate(false)
    }
  }, [revalidate, router, setRevalidate])

  return null;
}