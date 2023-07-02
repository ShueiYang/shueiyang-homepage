import { Metadata } from "next";
import ProjectForm from "@/components/ProjectForm";

export const metadata: Metadata = {
  title: "Admin - Kim Nguyen"
}

const CreateProject = () => {

  return (
    <ProjectForm 
      type="create"
      legend="Project insertion"
    />
  )
}

export default CreateProject;