import { Metadata } from "next";
import ProjectForm from "@/components/ProjectForm";

export const metadata: Metadata = {
  title: "Dashboard - Kim Nguyen"
}

const ProjectPanel = () => {


    const TestForm = {
        id: "64a01ad1851be36f84a9e775",
        title: "Title project name test",
        imageFile: "/images/assets/marvel.jpg",
        description: "description project blabla",
        siteUrl: "https//vercel//project",
        githubUrl: "https/github.com/etc",
        stack: ["java","react","tailwind"],
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam modi distinctio voluptates odio, amet voluptate? Rem id est minima, aperiam illum temporibus nihil magni deserunt itaque voluptate consectetur ea iusto?"
    }

    const stackAsString = TestForm.stack.join(", ");

    const projectTest = {
        ... TestForm,
        stack: stackAsString
    }



  return (
    <ProjectForm 
      type="edit"
      legend="Project editing"
      project={projectTest}
    />
  )
}

export default ProjectPanel;