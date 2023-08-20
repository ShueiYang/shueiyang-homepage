import { MethodAction } from "@/components/ProjectForm";
import { useState } from "react";
import { useRouter } from "next/navigation";



// custom hook
function usePortFolio() {

  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  

  async function uploadProject(
    formData: FormData, 
    type: MethodAction, 
    projectId: string | undefined
  ) {
    const apiRoute = type === "edit" && projectId 
      ? `/api/auth/update/${projectId}` 
      : "/api/auth/upload";

    setSubmitError(""); 
    try {
      const response = await fetch(apiRoute, {
        method: type === "create" ? "POST" : "PUT",
        body: formData,
      });
      if (response.status === 201 || response.status === 200) {
      // not work as expected
        router.replace("/projects")
        router.refresh();

      } else {
        throw new Error(
          `Failed to ${
            type === "create" ? "create" : "edit"
          } a project. Try again!`
        );
      }
    } catch (err) {
      console.error(err);
      if(err instanceof Error) {
        setSubmitError(err.message);
      }  
    }
  }


  async function deleteProject (projectId: string) {
    try {
      const response = await fetch(`/api/auth/update/${projectId}`, {
        method: "DELETE"
      })
      if(response.ok) {
      // not work as expected
        router.replace("/projects")
        router.refresh();   
      } else {
        
        throw new Error("Failed to delete project. Try again!")
      }  
    } catch (err) {
      console.error(err)
      if(err instanceof Error) {
        setSubmitError(err.message)
      }
    }
  }
  
  return {
    submitError,
    uploadProject,
    deleteProject,
  }  
};

export default usePortFolio;