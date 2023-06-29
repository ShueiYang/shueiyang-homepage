"use client";

import { FormProvider, useForm } from "react-hook-form";
import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import PageLayout from "@/components/layouts/PageLayout";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/action";
import { convertToBase64 } from "@/utils/utility";
import { useState } from "react";


interface FormProps {
    type: string,
    legend: string,
    project?: ProjectForm
}


const ProjectForm = ({type, legend, project }: FormProps) => {

    const [ submitError, setSubmitError ] = useState("");
    const route = useRouter();
    const initialForm = {
        title: project?.title || "",
        imageFile: project?.imageFile || "",
        description: project?.description || "",
        siteUrl: project?.siteUrl || "",
        githubUrl: project?.githubUrl || "",
        content: project?.content || "",
    }

    const methods = useForm<ProjectForm>({mode: "onChange", defaultValues: initialForm});
    const { handleSubmit, formState: { errors, isSubmitting } } = methods;

    async function submitProject (data: ProjectForm) {
      setSubmitError("")
      const formData = new FormData();
      const formField = Object.entries(data);
      try {
        await Promise.all(
          formField.map(async([key, value]) => {
            //check if the value is a FileList instance and if there is a file in FileList.
            if(key === "imageFile") {
              if(value instanceof FileList && value.length) {
                const result = await convertToBase64(value[0]);
                formData.append(key, result);
              }
            } else {
              formData.append(key, value);
            }  
          })
        );    
        const response = await fetch("/api/auth/admin/upload", {
          method: "POST",
          body: formData
        })
        if(response.status === 201) {
          route.push("/projects")
        } else {
          throw new Error(
            `Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`
          )
        }        
      } catch (err: any) {
          console.error(err)
          setSubmitError(err.message)
      }
    }





  return (
    <div className="container xl:max-w-5xl my-6 flex flex-col items-center justify-center lg:flex-row">
     <fieldset className="max-w-lg w-full">
       <PageLayout>
        <legend className="flex items-center justify-between w-full">
          <span className="font-ibm text-xl lg:text-2xl font-semibold block mt-3 tracking-wide">
            {legend}
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
            className="flex flex-col mt-4"
            onSubmit={handleSubmit(data => submitProject(data))}
            //   noValidate
          >
            <ImgUploadForm 
              label="imageFile"
              type={type}
              defaultImg={initialForm.imageFile}
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
            <InputForm 
              label="siteUrl"
              text="Sitelive Url"
              errorText="siteUrl est manquant"         
            /> 
            <InputForm 
              label="githubUrl"
              text="Source code Url"
              errorText="source code url est mamquant"         
            />
            <InputForm 
              label="stack"
              text="Techno stack"
              errorText="stack est requis"         
            />  
            <TextareaForm 
              label="content"
              text="Votre contenu"
              errorText="Le contenu est requis" 
            />
             <button 
              className="btn-primary flex items-center mx-auto mt-6"
             >
              { isSubmitting ? "Uploading..." 
                : "Upload"
              }
             </button>     
           </form>
         </FormProvider>
          { submitError &&
            <p className="text-sm text-red-500 dark:text-red-400 text-center mt-3">
              {submitError}
            </p>
          }
          { (errors.imageFile) &&
            <p className="text-sm text-red-500 dark:text-red-400 text-center mt-3">
              Images are required
            </p>
          }
       </PageLayout>
     </fieldset>
    </div>
  )
}

export default ProjectForm;