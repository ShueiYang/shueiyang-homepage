"use client";

import { FormProvider, useForm } from "react-hook-form";
import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import PageLayout from "@/components/layouts/PageLayout";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/action";
import usePortFolio from "@/hooks/usePortFolio";

interface FormProps {
    type: string,
    legend: string,
    project?: ProjectForm
}


const ProjectForm = ({type, legend, project }: FormProps) => {
  
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
  const { 
    handleSubmit, 
    formState: { 
      errors, 
      isSubmitting,
      dirtyFields
    } 
  } = methods;

  // custom hook
  const { submitError, uploadProject } = usePortFolio(dirtyFields);
  
  

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
            onSubmit={handleSubmit(data => uploadProject(data, type))}
            // noValidate
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