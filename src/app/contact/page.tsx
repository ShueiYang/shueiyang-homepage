"use client";

import dynamic from "next/dynamic"
import { useState } from "react";
import { motion } from "framer-motion"
import { sendEmail } from "@/lib/sendEmail";
import { slideIn } from "@/utils/motion";
import { FormProvider, useForm } from "react-hook-form";
import { RiMailSendFill } from "react-icons/ri";
import { EmailForm } from "../../../common.types";

import PreviousLink from "@/components/PreviousLink";
import SuccessForm from "@/components/SuccessForm";
import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";

const MapLocation = dynamic(()=> import("@/components/map/MapLocation"), {
  ssr: false 
})


function Contact () {
  
  const [error, setError] = useState<{ message: string } | null>(null);
  const initialForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }

  const methods = useForm<EmailForm>({mode: "onChange", defaultValues: initialForm});
  const { 
    handleSubmit, 
    reset, 
    formState: { 
      isValid,
      isSubmitting, 
      isSubmitSuccessful 
    } 
  } = methods;

  
  async function submitEmail(form: EmailForm) {
    try {
      setError(null);
      const response = await sendEmail(form); // send Email using emailjs library
      if(response.status === 200) {
        reset();    
      }
    } catch (err) {
      console.error("ErrorLog", err);
      setError({message: "Une erreur est survenue lors de l'envoi d'un email à ce contact"})
    } 
  }

  if(isSubmitSuccessful && !error) {
    return <SuccessForm />
  }
  return (
    <div className="container xl:max-w-5xl my-6 flex flex-col items-center justify-between lg:flex-row">
      <motion.fieldset
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={slideIn("left", "tween", 0.2)}
        className="max-w-lg w-full lg:flex-[0.45] p-2 lg:p-8"
      >
        <legend>
          <PreviousLink path="/">
            Retour
          </PreviousLink>
          <span className="font-ibm text-3xl lg:text-4xl font-semibold block mt-3 tracking-wide">
            Contact
          </span>
        </legend>
        
        <FormProvider {...methods}>
          <form
            className="flex flex-col mt-2 "
            onSubmit={handleSubmit(submitEmail)}
            noValidate
          >
            <InputForm 
              label="name"
              text="Votre Nom"
              errorText="Un nom est requis"  
            />
            <InputForm 
              label="email"
              text="Votre Email"
              errorText="Une adresse email est requise"       
            />
            <InputForm 
              label="subject"
              text="Sujet"
              errorText="Un sujet est requis"      
            />
            <TextareaForm 
              label="message"
              text="Votre message"
              errorText="Veuillez écrire un message avant l'envoi"
            />   
            <button 
              className={`${isValid ? "" : "inactive"} btn-primary flex items-center mx-auto mb-4`}
              aria-label={isSubmitting ? "Envoi en cours..." : "Envoyer"}
              aria-disabled={!isValid}
            >
              <RiMailSendFill className="mr-3 text-xl"/>
              { isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </FormProvider>
        
        { error &&
          <p className="text-sm text-red-500 dark:text-red-400 text-center mt-3">
            {error.message}
          </p>
        }
      </motion.fieldset> 
      
      <MapLocation />
    </div> 
  )
}

export default Contact;