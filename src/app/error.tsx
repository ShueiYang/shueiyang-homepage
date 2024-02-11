"use client"; // Error components must be Client Components

import Button from "@/components/customButton/Button";
import PageLayout from "@/components/layouts/PageLayout";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <PageLayout>
      <div className="container my-8 md:my-[10%] xl:max-w-5xl">
        <h1 className="mx-auto mb-8 max-w-[500px] text-center font-ibm text-2xl font-semibold">
          Une erreur s&apos;est produite lors de l&apos;affichage de cette page
          ... :/
        </h1>
        <hr />

        <button
          className="btn-primary mx-auto mt-6 flex items-center text-base"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Reessayez
        </button>
        <span className="mx-auto mt-3 block w-20 text-center">ou</span>
        <Button path="/">
          <span className="text-base">Retour à la page d&apos;accueil</span>
        </Button>
      </div>
    </PageLayout>
  );
}
