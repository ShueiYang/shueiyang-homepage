import Image from "next/image";
import { ModalSection } from "./layouts/Section";
import  Button from "@/components/customButton/Button";


const SuccessForm = () => {
  
    return (
        
        <ModalSection>
            <div className="block my-8 text-center">
                <Image 
                    className="inline-block mr-2 align-top fill-blue-500"
                    src={"/icons/check_circle.svg"}
                    width={24}
                    height={24}
                    alt="check-circle Icon"
                />
                <span className="text-lg text-center my-4 md:my-8">
                    Votre message a été envoyé avec succès. 
                </span>
            </div>
            <Button path="/">
                <span className="text-base">Retour à la page d&apos;accueil</span> 
            </Button>   
        </ModalSection>
    )

}
  
export default SuccessForm;