import { Metadata } from "next";
import { ProjectData } from "../../../../../common.types";
import ProjectForm from "@/components/ProjectForm";
import { notFound } from "next/navigation";
import { getProjectInfo } from "@/app/action";

export const metadata: Metadata = {
  title: "Dashboard - Kim Nguyen"
}

export interface ParamsRoute {
  params: {id: string}
}

const ProjectPanel = async ({params}: ParamsRoute) =>  {
  const id = params.id;
  
  const project: ProjectData | null = await getProjectInfo(id);

  if(!project) {
    notFound();
  }
  // modify the data to match the ProjectForm
  const imageUrl = project.images[0].secure_url;
  const stackAsString = project.stack.join(", ");

  const projectData = {
    ...project,
    imageFile: imageUrl,
    stack: stackAsString
  }
    
  return (
    <ProjectForm 
      type="edit"
      legend="Project editing"
      project={projectData}
    />
  )
}

export default ProjectPanel;