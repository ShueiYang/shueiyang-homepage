import Image from "next/image";
import { ModalSection } from "./layouts/Section";
import Button from "@/components/customButton/Button";

const SuccessForm = () => {
  return (
    <ModalSection>
      <div className="my-8 block text-center">
        <Image
          className="mr-2 inline-block fill-blue-500 align-top"
          src={"/icons/check_circle.svg"}
          width={24}
          height={24}
          alt="check-circle Icon"
        />
        <span className="my-4 text-center text-lg md:my-8">
          Votre message a été envoyé avec succès.
        </span>
      </div>
      <Button path="/">
        <span className="text-base">Retour à la page d&apos;accueil</span>
      </Button>
    </ModalSection>
  );
};

export default SuccessForm;
