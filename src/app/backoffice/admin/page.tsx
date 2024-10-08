"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminFormSchema } from "@/validator/schemaValidation";
import { AdminForm } from "@root/common.types";
import InputForm from "@/components/formToSubmit/InputForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [authenticate, setAuthenticate] = useState(false);
  const [scope, animate] = useAnimate();

  const methods = useForm<AdminForm>({
    resolver: zodResolver(AdminFormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const buttonLabel = authenticate ? "Authenticate!" : "Connecter";

  async function handleLogin(userCredential: AdminForm) {
    setLoginError("");
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredential),
      });
      const data = await response.json();
      if (response.ok) {
        setAuthenticate(true);
        // Transition animation
        await animate(
          scope.current,
          { opacity: [1, 0], y: [0, 25] },
          { duration: 0.5 },
        );
        router.refresh();
        await animate(
          scope.current,
          { opacity: [0, 1], y: [25, 0] },
          { duration: 0.5 },
        );
      } else if (response.status === 401) {
        setLoginError(data.message);
      }
    } catch (err) {
      console.error(err);
      setLoginError("Network Error");
    }
  }

  return (
    <div
      ref={scope}
      className="container my-6 flex flex-col items-center justify-center lg:flex-row xl:max-w-5xl"
    >
      <fieldset className="w-full max-w-lg text-center">
        <legend className="mx-auto">
          <span className="mt-3 block font-ibm text-3xl font-semibold tracking-wide lg:text-3xl">
            Connexion au BackOffice
          </span>
        </legend>

        <FormProvider {...methods}>
          <form
            className="mx-auto mt-6 flex max-w-xs flex-col"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
          >
            <InputForm label="username" text="Admin username" />
            <InputForm label="password" text="Password" />
            <button
              className={`${isSubmitting || authenticate ? "inactive" : ""} btn-primary mx-auto mt-6 flex items-center`}
            >
              {isSubmitting ? "Checking..." : buttonLabel}
            </button>
          </form>
        </FormProvider>
        {loginError && (
          <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
            {loginError}
          </p>
        )}
      </fieldset>
    </div>
  );
}
