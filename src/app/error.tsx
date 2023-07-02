"use client" // Error components must be Client Components

import Button from "@/components/customButton/Button";
import PageLayout from "@/components/layouts/PageLayout";
import { useEffect } from "react"

 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <PageLayout>
      <div className="container xl:max-w-5xl mt-6 md:mt-[10%]">
        <h1 className="text-3xl font-ibm font-semibold text-center mb-4">
          Une erreur s&apos;est produite... :/
        </h1>
        <hr />
        
        <button
          className="btn-primary flex items-center text-base mx-auto mt-6"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Reessayez
        </button>
        <span className="block w-20 text-center mt-3 mx-auto">
          ou
        </span>
        <Button path="/">
          <span className="text-base">Retour à la page d&apos;accueil</span>
        </Button>
      </div>
    </PageLayout>
  )
}