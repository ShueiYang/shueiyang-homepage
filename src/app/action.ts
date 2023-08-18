import { prisma } from "@/lib/prisma"
import { ProjectData } from "@root/common.types"



// function to query database in server component
export async function getProjects(): Promise<ProjectData[]>  {
  try {
    const results = await prisma.project.findMany({
      include:{
        images: true
      },
      orderBy: {
        createAt: "desc" // Sort by most recent date
      }
    })
    return results
  } catch (error) {
    console.error(error)
    throw error
  }
}


// function to query project detail from DB in server component
export async function getProjectInfo(
  projectId: string
): Promise<ProjectData | null> {
  try {
    const project = await prisma.project.findUnique({
      where: {id: projectId},
      include:{
        images: true  // Include the associated images
      },   
    })      
    return project
  } catch (error) {
    console.error(error)
    throw error
  }  
}