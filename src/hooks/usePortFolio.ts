import { FieldNamesMarkedBoolean } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertToBase64 } from "@/utils/utility";

type FieldsProps = Partial<Readonly<FieldNamesMarkedBoolean<ProjectForm>>>


// custom hook
function usePortFolio(dirtyFields: FieldsProps) {

  const route = useRouter();
  const [submitError, setSubmitError] = useState("");

    console.log("HOOK FUNCTION RECREATE");
    console.log("fields check", dirtyFields);
    

  async function uploadProject(data: ProjectForm, type: string) {

    setSubmitError("");
    const formData = new FormData();
    const formField = Object.entries(data);
    try {
      await Promise.all(
        formField.map(async ([key, value]) => {
          //check if the value is a FileList instance and if there is a file in FileList.
          if (key === "imageFile") {
            if (value instanceof FileList && value.length) {
              const result = await convertToBase64(value[0]);
              formData.append(key, result);
            }
          } else {
            formData.append(key, value);
          }
          return null;
        })
      );
      const response = await fetch("/api/auth/upload", {
        method: "POST",
        body: formData,
      });
      if (response.status === 201) {
        route.push("/projects");
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
  
  return {
    submitError,
    uploadProject,
  }  
};

export default usePortFolio;