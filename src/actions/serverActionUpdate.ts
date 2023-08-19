"use server";

import { ActionProps, Portfolio, ImageProps } from "@root/common.types";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/app/api/cloudinary.actions";
import { revalidatePath } from "next/cache";

interface UpdateProps {
  oldAssetId: string,
  cloudImage: ImageProps,
  stackArray: string[]
}


export async function updateProjectAction(
  formData: FormData,
  projectId: string
): Promise<ActionProps> {
  try {
    const { 
      title, 
      description, 
      siteUrl, 
      githubUrl, 
      content 
    } = Object.fromEntries(formData) as unknown as Portfolio;
      
    const imageFile = formData.get("imageFile") as string | null;
    const stack = formData.get("stack") as string | null;
    const updateData = {} as UpdateProps;

    const resultFound = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        images: true, // Include the associated images
      },
    });
    if (!resultFound) {
      throw new Error("Project not found!")
    }
    if (imageFile) {
      updateData.oldAssetId = resultFound.images[0].id;
      const publicId = resultFound.images[0].public_id;
      const folderPath = resultFound.images[0].folder;
      updateData.cloudImage = await uploadImage(
        imageFile,
        folderPath,
        publicId
      );
    }
    if (stack) {
      updateData.stackArray = stack.split(", ");
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        title: title || undefined,
        description: description || undefined,
        images: imageFile
          ? {
              update: {
                where: { id: updateData.oldAssetId },
                data: updateData.cloudImage,
              },
            }
          : undefined,
        siteUrl,
        stack: stack ? updateData.stackArray : undefined,
        githubUrl,
        content,
      },
    });

    revalidatePath("/projects");
    return { error: null }
    
  } catch (err) {
    console.error(err);
    if(err instanceof Error) {
      return { error: err.message }
    }
    return { error: "Error: Failed to update project" };
  }
};