"use client";

import { ProjectForm } from "@root/common.types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  FieldNamesMarkedBoolean,
  FormProvider,
  useForm,
} from "react-hook-form";

import usePortFolio from "@/hooks/usePortFolio";
import { logOut } from "@/actions/serverAction";
import { convertRawDataToFormData } from "@/utils/formDataHelper";

import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import PageLayout from "@/components/layouts/PageLayout";
import ModalDialog from "@/components/modal/ModalDialog";

export type FieldsProps = Partial<
  Readonly<FieldNamesMarkedBoolean<ProjectForm>>
>;
export type MethodAction = "create" | "edit";

interface FormProps {
  type: MethodAction;
  legend: string;
  project?: ProjectForm;
}

const ProjectForm = ({ type, legend, project }: FormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const projectId = project?.id;

  const initialForm: ProjectForm = {
    title: project?.title ?? "",
    imageFile: project?.imageFile ?? null,
    description: project?.description ?? "",
    siteUrl: project?.siteUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    stack: project?.stack ?? "",
    content: project?.content ?? "",
  };

  const methods = useForm<ProjectForm>({
    mode: "onChange",
    defaultValues: initialForm,
  });
  const {
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, dirtyFields },
  } = methods;

  // use portfolio custom hooks
  const { submitError, uploadProject, deleteProject } = usePortFolio();

  async function handleUpload(data: ProjectForm) {
    const formData = await convertRawDataToFormData(data, dirtyFields);
    await uploadProject(formData, type, projectId);
  }

  const buttonLabel = type === "create" ? "Upload" : "Update";

  return (
    <PageLayout>
      <div className="container my-6 flex flex-col items-center justify-center lg:flex-row xl:max-w-5xl">
        <fieldset className="w-full max-w-lg">
          <legend className="flex w-full items-center justify-between">
            <span className="mt-3 block font-ibm text-xl font-semibold tracking-wide lg:text-2xl">
              {legend}
            </span>
            <button
              className={`btn-primary mt-3 px-2 ${isPending ? "inactive" : ""}`}
              onClick={() =>
                startTransition(() => {
                  logOut();
                  router.refresh();
                })
              }
            >
              {isPending ? "logging out..." : "Deconnexion"}
            </button>
          </legend>

          <FormProvider {...methods}>
            <form
              className="mt-4 flex flex-col"
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
                <button
                  className={`btn-primary mt-6 flex items-center ${isSubmitting || !isDirty ? "inactive" : ""}`}
                >
                  {isSubmitting ? "Uploading..." : buttonLabel}
                </button>

                {type === "edit" && project && (
                  <ModalDialog
                    type={type}
                    title={project.title}
                    projectId={project.id}
                    deleteAction={deleteProject}
                  />
                )}
              </div>
            </form>
          </FormProvider>
          {submitError && (
            <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
              {submitError}
            </p>
          )}
          {errors.imageFile && (
            <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
              Images are required
            </p>
          )}
        </fieldset>
      </div>
    </PageLayout>
  );
};

export default ProjectForm;
