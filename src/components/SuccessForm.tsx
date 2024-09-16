import Image from "next/image";
import Button from "@/components/customButton/Button";

export default function SuccessForm() {
  return (
    <div
      id="successMail"
      className="container relative mt-6 md:mt-[10%] xl:max-w-5xl"
    >
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
    </div>
  );
}
