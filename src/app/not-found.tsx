import Button from "@/components/customButton/Button";

export default function NotFound() {
  return (
    <div className="container mt-6 md:mt-[10%] xl:max-w-5xl">
      <h1 className="mb-4 text-center font-ibm text-3xl font-semibold">
        404 Page non trouvée
      </h1>
      <hr />
      <p className="mt-4 text-center text-lg">
        Uh-Oh... une erreur...et la page que vous recherchez est introuvable.
      </p>
      <Button path="/">
        <span className="text-base">Retour à la page d&apos;accueil</span>
      </Button>
    </div>
  );
}
