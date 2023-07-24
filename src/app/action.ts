"use server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { ProjectData } from "@root/common.types"

// testing server action
export async function logOut() {
  cookies().set({
    name: "shueiJWT",
    value: "",
    maxAge: -1,
    path: "/"
  })
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