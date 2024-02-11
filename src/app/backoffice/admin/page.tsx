"use client";

import { AdminForm } from "@root/common.types";
import InputForm from "@/components/formToSubmit/InputForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageLayout from "@/components/layouts/PageLayout";

const AdminLoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [authenticate, setAuthenticate] = useState(false);

  const methods = useForm<AdminForm>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

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
        router.refresh();
      } else if (response.status === 401) {
        setLoginError(data.message);
      }
    } catch (err) {
      console.error(err);
      setLoginError("Network Error");
    }
  }

  return (
    <PageLayout>
      <div className="container my-6 flex flex-col items-center justify-center lg:flex-row xl:max-w-5xl">
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
              <InputForm label="username" text="Admin username" errorText="" />
              <InputForm label="password" text="Password" errorText="" />
              <button
                className={`${isSubmitting || authenticate ? "inactive" : ""} btn-primary mx-auto mt-6 flex items-center`}
              >
                {isSubmitting
                  ? "Checking..."
                  : authenticate
                    ? "Authenticate!"
                    : "Connecter"}
              </button>
            </form>
          </FormProvider>
          {loginError && (
            <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
              {loginError}
            </p>
          )}
          {(errors.username || errors.password) && (
            <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
              All field are required
            </p>
          )}
        </fieldset>
      </div>
    </PageLayout>
  );
};

export default AdminLoginPage;
