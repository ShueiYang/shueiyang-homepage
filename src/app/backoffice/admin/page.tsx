"use client";

import { AdminForm } from "@root/common.types";
import InputForm from "@/components/formToSubmit/InputForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useState } from "react";
import PageLayout from "@/components/layouts/PageLayout";


const AdminLoginPage = () => {

  const router = useRouter();
  const [ loginError, setLoginError ] = useState("");
  const [ authenticate, setAuthenticate ] = useState(false);

  const methods = useForm<AdminForm>();
  const { 
    handleSubmit, 
    formState: { 
      errors,
      isSubmitting, 
    } 
  } = methods;

  async function handleLogin(userCredential: AdminForm) {   
    setLoginError("")
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userCredential)      
      });
      const data = await response.json();
      if(response.ok) {
        setAuthenticate(true);
        router.refresh();
      } else if (response.status === 401) {
        setLoginError(data.message)  
      }
    } catch (err) {
      console.error(err)
      setLoginError("Network Error")   
    } 
  }


  return (
    <div className="container xl:max-w-5xl my-6 flex flex-col items-center justify-center lg:flex-row">
      <fieldset className="max-w-lg w-full text-center">
        <PageLayout>
          <legend className="mx-auto">
            <span className="font-ibm text-3xl lg:text-3xl font-semibold block mt-3 tracking-wide">
              Connexion au BackOffice
            </span>
          </legend>
          
          <FormProvider {...methods}>
            <form
              className="flex flex-col max-w-xs mt-6 mx-auto"
              onSubmit={handleSubmit(handleLogin)}
              noValidate
            >
              <InputForm
                label="username"
                text="Admin username"
                errorText=""     
              />
              <InputForm 
                label="password"
                text="Password"
                errorText=""       
              /> 
              <button 
                className="btn-primary flex items-center mx-auto mt-6"
              >
                { isSubmitting ? "Checking..." 
                  : authenticate ? "Authenticate!" 
                  : "Connecter"
                }
              </button>
            </form>
          </FormProvider>
          { loginError &&
            <p className="text-sm text-red-500 dark:text-red-400 text-center mt-3">
              {loginError}
            </p>
          }
          { (errors.username || errors.password) &&
            <p className="text-sm text-red-500 dark:text-red-400 text-center mt-3">
              All field are required
            </p>
          }
        </PageLayout>
      </fieldset>
    </div>    
  )
}

export default AdminLoginPage;