"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormSchema } from "@/validator/schemaValidation";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { RiMailSendFill } from "react-icons/ri";
import { EmailForm } from "@root/common.types";
import { sendEmail } from "@/lib/sendEmail";
import { slideIn } from "@/utils/motion";

import SuccessForm from "@/components/SuccessForm";
import PreviousLink from "@/components/PreviousLink";
import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";

const MapLocation = dynamic(() => import("@/components/map/MapLocation"), {
  ssr: false,
});

export default function Contact() {
  const [error, setError] = useState<{ message: string } | null>(null);
  const initialForm: EmailForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const methods = useForm<EmailForm>({
    mode: "onChange",
    resolver: zodResolver(EmailFormSchema),
    defaultValues: initialForm,
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
  } = methods;

  async function submitEmail(form: EmailForm) {
    try {
      setError(null);
      const response = await sendEmail(form); // send Email using emailjs library
      if (response.status === 200) {
        reset();
      }
    } catch (err) {
      console.error("ErrorLog", err);
      setError({
        message:
          "Une erreur est survenue lors de l'envoi d'un email à ce contact",
      });
    }
  }

  if (isSubmitSuccessful && !error) {
    return <SuccessForm />;
  }
  return (
    <div className="container my-6 flex flex-col items-center justify-between lg:flex-row xl:max-w-5xl">
      <motion.fieldset
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={slideIn("left", "tween", 0.2)}
        className="w-full max-w-lg p-2 lg:flex-[0.45] lg:p-8"
      >
        <legend>
          <PreviousLink path="/">Retour</PreviousLink>
          <span className="mt-3 block font-ibm text-3xl font-semibold tracking-wide lg:text-4xl">
            Contact
          </span>
        </legend>

        <FormProvider {...methods}>
          <form
            className="mt-2 flex flex-col "
            onSubmit={handleSubmit(submitEmail)}
            noValidate
          >
            <InputForm label="name" text="Votre Nom" />
            <InputForm label="email" text="Votre Email" />
            <InputForm label="subject" text="Sujet" />
            <TextareaForm label="message" text="Votre message" />
            <button
              className={`${!isValid || isSubmitting ? "inactive" : ""} btn-primary mx-auto mb-4 flex items-center`}
              aria-label={isSubmitting ? "Envoi en cours..." : "Envoyer"}
              aria-disabled={!isValid}
            >
              <RiMailSendFill className="mr-3 text-xl" />
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </FormProvider>
        {error && (
          <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
            {error.message}
          </p>
        )}
      </motion.fieldset>

      <MapLocation />
    </div>
  );
}
