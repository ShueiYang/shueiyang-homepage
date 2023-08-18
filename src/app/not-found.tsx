import Button from "@/components/customButton/Button";
import PageLayout from "@/components/layouts/PageLayout";


export default function NotFound() {

  return (
    <PageLayout>
      <div className="container xl:max-w-5xl mt-6 md:mt-[10%]">
        <h1 className="text-3xl font-ibm font-semibold text-center mb-4">
          404 Page non trouvée
        </h1>
        <hr />
        <p className="text-lg text-center mt-4">
          Uh-Oh... une erreur...et la page que vous recherchez est introuvable.
        </p>
        <Button path="/">
          <span className="text-base">Retour à la page d&apos;accueil</span>
        </Button>
      </div>
    </PageLayout>
  );
};