"use client";

import dynamic from "next/dynamic"
import { useRef, useState } from "react";
import { motion } from "framer-motion"
import { sendEmail } from '@/lib/sendEmail';

import { slideIn } from "@/utils/motion";
import { FormProvider, useForm } from 'react-hook-form';

import PreviousLink from '@/components/PreviousLink';
import SuccessForm from "@/components/SuccessForm";
import InputForm from "@/components/formToSubmit/InputForm";
import { RiMailSendFill } from "react-icons/ri";
import TextareaForm from "@/components/formToSubmit/TextareaForm";

const MapLocation = dynamic(()=> import("@/components/map/MapLocation"), {
  ssr: false 
})

function Contact () {
  
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isSend, setIsSend ] = useState(false);

  const methods = useForm<InputsProps>();
  const { handleSubmit } = methods;

  const pageTitle = "Contact - Kim Nguyen"
  
  function resetForm() {
    formRef.current?.reset();
  }

  async function submitEmail(form: InputsProps) {
    setLoading(true);
    try {
      const response = await sendEmail(form); // send Email using emailjs library
      if(response.status === 200) {
        resetForm()
        setIsSend(true)
        setError(null);
      }
    } catch (err) {
      console.error("ErrorLog", err);
      setError({message: "Une erreur est survenue lors de l'envoi d'un email à ce contact"})
    } finally {
      setLoading(false);
    }
  }

  if(isSend) {
    return <SuccessForm />
  }
  return (
    <div className="container xl:max-w-5xl my-6 flex flex-col items-center justify-between lg:flex-row">
 
      <motion.fieldset
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={slideIn("left", "tween", 0.2)}
        className="max-w-lg w-full lg:flex-[0.45] p-8"
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
            ref={formRef}
            className="flex flex-col mt-2 "
            onSubmit={handleSubmit(data => submitEmail(data))}
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
            <button className="btn-primary flex items-center mx-auto">
              <RiMailSendFill className="mr-3 text-xl"/>
              {loading? "Envoi en cours..." : "Envoyer"}
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