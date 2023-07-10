import { Metadata } from "next";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(()=> import("@/components/ProjectForm"), {
  ssr: false
})

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