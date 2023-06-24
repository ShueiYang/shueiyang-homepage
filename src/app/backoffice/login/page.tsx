"use client";

import InputForm from "@/components/formToSubmit/InputForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useState } from "react";
import PageLayout from "@/components/layouts/PageLayout";

interface User {
  username: string,
  password: string,
}


const AdminLoginPage = () => {

  const router = useRouter();
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");

  const methods = useForm<InputsProps>();
  const { handleSubmit } = methods;

  async function handleLogin(userCredential: User) {   
    setError("")
    setLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userCredential)      
      });
      const data = await response.json();
      if(response.ok) {
        router.refresh();
      } else if (response.status === 401) {
        setError(data.message)  
      }
    } catch (err) {
      console.error(err)
      setError((err as Error).message)   
    } finally {
      setLoading(false)
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
              onSubmit={handleSubmit(data => handleLogin(data))}
                //   noValidate
            >
              <InputForm
                label="username"
                text="Admin username"
                errorText="username est requis"     
              />
              <InputForm 
                label="password"
                text="Password"
                errorText="password est requis"       
              /> 
              <button 
                className="btn-primary flex items-center mx-auto mt-6"
              >
                {loading? "Checking..." : "Connecter"}
              </button>
            </form>
          </FormProvider>
          { error &&
            <p className="text-sm text-red-500 dark:text-red-400 text-center mt-3">
              {error}
            </p>
          }
        </PageLayout>
      </fieldset>
    </div>    
  )
}

export default AdminLoginPage;