"use client";

import { ProjectForm } from "@root/common.types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FieldNamesMarkedBoolean, FormProvider, useForm } from "react-hook-form";

import usePortFolio from "@/hooks/usePortFolio";
import { logOut } from "@/actions/serverAction";
import { convertRawDataToFormData } from "@/utils/formDataHelper";

import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import PageLayout from "@/components/layouts/PageLayout";
import ModalDialog from "@/components/modal/ModalDialog";

export type FieldsProps = Partial<Readonly<FieldNamesMarkedBoolean<ProjectForm>>>
export type MethodAction = "create" | "edit"

interface FormProps {
  type: MethodAction,
  legend: string,
  project?: ProjectForm
}


const ProjectForm = ({type, legend, project }: FormProps) => {
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const projectId = project?.id

  const initialForm = {
    title: project?.title || "",
    imageFile: project?.imageFile || "",
    description: project?.description || "",
    siteUrl: project?.siteUrl || "",
    githubUrl: project?.githubUrl || "",
    stack: project?.stack || "",
    content: project?.content || "",
  }
  
  const methods = useForm<ProjectForm>({mode: "onChange", defaultValues: initialForm});
  const { 
    handleSubmit, 
    formState: { 
      errors,
      isDirty, 
      isSubmitting,
      dirtyFields
    } 
  } = methods;

  // use portfolio custom hooks
  const { submitError, uploadProject, deleteProject } = usePortFolio();
  

  async function handleUpload(data: ProjectForm) {
    const formData = await convertRawDataToFormData(data, dirtyFields);
    await uploadProject(formData, type, projectId);
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
            className={`btn-primary px-2 mt-3 ${isPending ? "inactive" : ""}`}
            onClick={()=> startTransition(()=> {
              logOut()
              router.refresh();
            })}
          >
            {isPending ? "logging out..." : "Deconnexion"}
          </button>
        </legend>
        
        <FormProvider {...methods}>
          <form
            className="flex flex-col mt-4"
            onSubmit={handleSubmit(handleUpload)}
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
            <div className="flex justify-around">
              <button className={`btn-primary flex items-center mt-6 ${isSubmitting || !isDirty ? "inactive" : ""}`}>
                { isSubmitting 
                  ? "Uploading..." 
                  : type === "create" ? "Upload" : "Update"
                }
              </button> 

              {type === "edit" && project &&
                <ModalDialog 
                  type={type} 
                  title={project.title}
                  projectId={project.id}
                  deleteAction={deleteProject}
                />
              }
             </div>  
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