"use server";

import { ActionProps } from "@root/common.types";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/app/api/cloudinary.actions";
import { revalidatePath } from "next/cache";



export async function deleteProjectAction(
  projectId: string
): Promise<ActionProps> {
  try {
    const resultFound = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        images: true, // Include the associated images
      } 
    }) 

    if(!resultFound) {
      throw new Error("Project not found!")
    }
    // delete image from cloudinary
    if(resultFound.images.length) {
      const folderPath = resultFound.images[0].folder;   
      await deleteImage(folderPath); 
    }
    // delete project
    await prisma.project.delete({where: {id: projectId}})

    revalidatePath("/projects");
    return { error: null }
    
  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      return { error: err.message }
    }
    return { error: "Error: Failed to delete project" };
  }
};