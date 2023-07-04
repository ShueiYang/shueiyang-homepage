import { FieldNamesMarkedBoolean } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { processImage } from "@/utils/imageTool";

type FieldsProps = Partial<Readonly<FieldNamesMarkedBoolean<ProjectForm>>>


// custom hook
function usePortFolio(dirtyFields: FieldsProps) {

  const router = useRouter();
  const [submitError, setSubmitError] = useState("");


  async function uploadProject(
    data: ProjectForm, 
    type: string, 
    projectId: string | undefined
  ) {
    const apiRoute = type === "edit" && projectId ? 
      `/api/auth/update/${projectId}` : "/api/auth/upload";

    setSubmitError("");
    const formData = new FormData();
    const formField = Object.entries(data);
    try {
      await Promise.all(
        formField.map(async ([key, value]) => {
          //check if the value is a FileList instance and if there is a file in FileList.
          if (key === "imageFile") {
            if (value instanceof FileList && value.length) {
              const result = await processImage(value[0]);
              formData.append(key, result);
            }
          } else {
          // only append data if is modified in the input value
            if(dirtyFields[key as keyof ProjectForm]) {
              formData.append(key, value);
            }
          }
          return null;
        })
      );
      const response = await fetch(apiRoute, {
        method: type === "create" ? "POST" : "PUT",
        body: formData,
      });
      if (response.status === 201 || response.status === 200) {
      // workaround to revalidate data but not work as expected
        router.replace("/projects")
        router.refresh()
      } else {
        throw new Error(
          `Failed to ${
            type === "create" ? "create" : "edit"
          } a project. Try again!`
        );
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message);
    }
  }


  async function deleteProject (projectId: string) {
    try {
      const response = await fetch(`/api/auth/update/${projectId}`, {
        method: "DELETE"
      })
      if(response.ok) {
      // workaround to revalidate data but not work as expected
        router.replace("/projects")
        router.refresh()
      } else {
        throw new Error("Failed to delete project. Try again!")
      }  
    } catch (err) {
      console.error(err)
    }
  }
  
  return {
    submitError,
    uploadProject,
    deleteProject,
  }  
};

export default usePortFolio;