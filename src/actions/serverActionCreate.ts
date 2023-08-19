"use server";

import { ActionProps, Portfolio } from "@root/common.types";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/app/api/cloudinary.actions";
import { revalidatePath } from "next/cache";


export async function addProjectAction(
  formData: FormData
): Promise<ActionProps> {
  try {
    const { 
      title, 
      description, 
      siteUrl, 
      githubUrl, 
      content 
    } = Object.fromEntries(formData) as unknown as Portfolio;
      
    const imageFile = formData.get("imageFile") as string;
    const stack = formData.get("stack") as string;
    // transform into array
    const stackArray = stack.split(", ");
    // upload to cloudinary
    const folderName = title.replace(/\s/g, "");
    const folderPath = `api/portfolio/${folderName}`;
    const cloudImage = await uploadImage(imageFile, folderPath);

    // than create and save the document to the DB
    await prisma.project.create({
      data: {
        title,
        description,
        images: {
          create: [cloudImage],
        },
        siteUrl: siteUrl || "",
        stack: stackArray,
        githubUrl: githubUrl || "",
        content: content || "",
        owner: {
          connect: {
            id: "649c7484735a162a66509481", // connect in relation to adminUser
          },
        },
      },
    });

    revalidatePath("/projects");
    return { error: null };

  } catch (err) {
    console.error(err);
    return { error: "Error: Failed to upsert project" };
  }
};