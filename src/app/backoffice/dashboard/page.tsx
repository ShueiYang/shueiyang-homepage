import dynamic from "next/dynamic";

const ProjectForm = dynamic(()=> import("@/components/ProjectForm"), {
  ssr: false
})


const CreateProject = () => {

  return (
    <ProjectForm 
      type="create"
      legend="Project insertion"
    />
  )
}

export default CreateProject;