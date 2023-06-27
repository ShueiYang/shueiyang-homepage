"use client";

import { FormProvider, useForm } from "react-hook-form";
import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import PageLayout from "@/components/layouts/PageLayout";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/action";



const ClientProtectPage = () => {

  const methods = useForm<ProjectForm>();
  const { handleSubmit } = methods;
  const route = useRouter();

  // if(status === "loading") {
  //   return <Loader />
  // }

  return (
    <div className="container xl:max-w-5xl my-6 flex flex-col items-center justify-center lg:flex-row">
      <fieldset className="max-w-lg w-full">
        <PageLayout>
          <legend className="flex items-center justify-between w-full">
            <span className="font-ibm text-xl lg:text-2xl font-semibold block mt-3 tracking-wide">
                Project insertion
            </span>
            <button 
              className="btn-primary px-2 mt-3"
              onClick={()=> {
                logOut();
                route.refresh();
              }}
            >
              Deconnexion
            </button>
          </legend>
          
          <FormProvider {...methods}>
            <form
                //   ref={formRef}
                className="flex flex-col mt-4"
                //   onSubmit={handleSubmit(data => submitEmail(data))}
                //   noValidate
            >
                <ImgUploadForm 
                  label="imageFile"
                  errorText="Au moins une image est requise" 
                />

                <InputForm
                  label="title"
                  text="Title du projet"
                  errorText="Un titre est requis"         
                />
                <InputForm 
                  label="description"
                  text="Votre description"
                  errorText="Une description est requise"         
                />   
                <TextareaForm 
                  label="content"
                  text="Votre contenu"
                  errorText="Le contenu est requis" 
                />     
            </form>
          </FormProvider>
        </PageLayout>
      </fieldset>
    </div>
  )
}

export default ClientProtectPage;