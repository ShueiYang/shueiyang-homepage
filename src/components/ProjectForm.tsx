"use client";

import { useEffect, useOptimistic, useTransition } from "react";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormData, ServerActionState } from "@root/common.types";
import { ProjectFormSchema } from "@/validator/schemaValidation";
import { useRouter } from "next/navigation";
import {
  FieldNamesMarkedBoolean,
  FormProvider,
  useForm,
} from "react-hook-form";
import { convertRawDataToFormData } from "@/utils/formDataHelper";

// Server actions
import { logOut, uploadProject, deleteProject, updateProject } from "@/actions";

import { useAnimate } from "framer-motion";
import InputForm from "@/components/formToSubmit/InputForm";
import TextareaForm from "@/components/formToSubmit/TextareaForm";
import ImgUploadForm from "@/components/formToSubmit/ImgUploadForm";
import ModalDialog from "@/components/modal/ModalDialog";
import SubmitButton from "./customButton/SubmitButton";

export type FieldsProps = Partial<
  Readonly<FieldNamesMarkedBoolean<ProjectFormData>>
>;
export type MethodAction = "create" | "edit";

interface ProjectFormProps {
  type: MethodAction;
  legend: string;
  project?: ProjectFormData;
}

export default function ProjectForm({
  type,
  legend,
  project,
}: Readonly<ProjectFormProps>) {
  const projectId = project?.id;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [scope, animate] = useAnimate();

  const initialState: ServerActionState = {
    status: "InitialState",
    error: null,
  };
  // New useFormState hook
  const [createState, createAction] = useFormState(uploadProject, initialState);
  const [updateState, updateAction] = useFormState(updateProject, initialState);
  const [deleteState, deleteAction] = useFormState(deleteProject, initialState);

  /*
    useOptimistic hook to update and return to the main page before the delete action
    is completed, this solution avoid to get a 404 page when the project panel 
    is deleted with the cache revalidated behind the server action.
  */
  const [optimisticDeleteState, deleteOptimisticAction] = useOptimistic(
    deleteState,
    (state) => ({
      ...state,
      status: "Success" as ServerActionState["status"],
      error: null,
    }),
  );

  const initialForm: ProjectFormData = {
    title: project?.title ?? "",
    imageFile: project?.imageFile ?? "",
    description: project?.description ?? "",
    siteUrl: project?.siteUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    stack: project?.stack ?? "",
    content: project?.content ?? "",
  };

  const methods = useForm<ProjectFormData>({
    mode: "onChange",
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: initialForm,
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, dirtyFields },
  } = methods;

  useEffect(() => {
    async function handleTransitionRouter() {
      if (
        createState.status === "Success" ||
        updateState.status === "Success"
      ) {
        await exitAnimate();
        router.replace("/projects");
      } else if (optimisticDeleteState.status === "Success") {
        await exitAnimate();
        router.replace("/");
      }
    }

    handleTransitionRouter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState, updateState, optimisticDeleteState, router]);

  async function handleUpload(data: ProjectFormData) {
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
      deleteOptimisticAction(deleteState);
      deleteAction(projectId);
    });
  }

  async function exitAnimate() {
    await animate(
      scope.current,
      { opacity: [1, 0], y: [0, 25] },
      { duration: 0.5 },
    );
  }

  const buttonLabel = type === "create" ? "Upload" : "Update";

  return (
    <div
      ref={scope}
      className="container my-6 flex flex-col items-center justify-center lg:flex-row xl:max-w-5xl"
    >
      <fieldset className="w-full max-w-lg">
        <legend className="flex w-full items-center justify-between">
          <span className="mt-3 block font-ibm text-xl font-semibold tracking-wide lg:text-2xl">
            {legend}
          </span>
          <button
            className={`btn-primary mt-3 px-2 ${isPending ? "inactive" : ""}`}
            onClick={() =>
              startTransition(async () => {
                await logOut();
                await exitAnimate();
                router.refresh();
                await animate(
                  scope.current,
                  { opacity: [0, 1], y: [25, 0] },
                  { duration: 0.5 },
                );
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
  );
}
