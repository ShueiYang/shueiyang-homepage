"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectForm, ServerActionState } from "@root/common.types";
import { ProjectFormSchema } from "@/validator/schemaValidation";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import {
  FieldNamesMarkedBoolean,
  FormProvider,
  useForm,
} from "react-hook-form";

// import usePortFolio from "@/hooks/usePortFolio";
import { convertRawDataToFormData } from "@/utils/formDataHelper";

// Server actions
import { logOut, uploadProject, deleteProject, updateProject } from "@/actions";

import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import PageLayout from "@/components/layouts/PageLayout";
import ModalDialog from "@/components/modal/ModalDialog";
import SubmitButton from "./customButton/SubmitButton";
import { useFormState } from "react-dom";

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
  const projectId = project?.id;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialState: ServerActionState = {
    status: "InitialState",
    error: null,
  };
  // New useFormState hook
  const [createState, createAction] = useFormState(uploadProject, initialState);
  const [updateState, updateAction] = useFormState(updateProject, initialState);
  const [deleteState, deleteAction] = useFormState(deleteProject, initialState);

  const initialForm: ProjectForm = {
    title: project?.title ?? "",
    imageFile: project?.imageFile ?? "",
    description: project?.description ?? "",
    siteUrl: project?.siteUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    stack: project?.stack ?? "",
    content: project?.content ?? "",
  };

  const methods = useForm<ProjectForm>({
    mode: "onChange",
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: initialForm,
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, dirtyFields },
  } = methods;

  useEffect(() => {
    if (createState.status === "Success" || updateState.status === "Success") {
      router.replace("/projects");
    } else if (deleteState.status === "Success") {
      router.replace("/");
      // router.refresh();
    }
  }, [createState, deleteState, updateState, router]);

  async function handleUpload(data: ProjectForm) {
    startTransition(async () => {
      const formData = await convertRawDataToFormData(data, dirtyFields);

      if (type === "edit") {
        updateAction(formData);
      } else {
        createAction(formData);
      }
    });
  }

  function handleDelete(projectId: string) {
    startTransition(() => {
      deleteAction(projectId);
    });
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
              <InputForm label="id" text="" value={projectId} />
              <ImgUploadForm
                label="imageFile"
                defaultImg={initialForm.imageFile as string}
              />
              <InputForm label="title" text="Title du projet" />
              <InputForm label="description" text="Votre description" />
              <InputForm label="siteUrl" text="Sitelive Url" />
              <InputForm label="githubUrl" text="Source code Url" />
              <InputForm label="stack" text="Techno stack" />
              <TextareaForm label="content" text="Votre contenu" />
              <div className="flex justify-around">
                <SubmitButton
                  label={buttonLabel}
                  isPending={isSubmitting || isPending}
                  isDirty={isDirty}
                />

                {type === "edit" && project && (
                  <ModalDialog
                    type={type}
                    title={project.title}
                    projectId={project.id}
                    isPending={isPending}
                    handleDeleteAction={handleDelete}
                  />
                )}
              </div>
            </form>
          </FormProvider>
          {(createState.error || updateState.error || deleteState.error) && (
            <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
              {createState.error || updateState.error || deleteState.error}
            </p>
          )}
        </fieldset>
      </div>
    </PageLayout>
  );
};

export default ProjectForm;
