"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProjectFormSchema } from "@/validator/schemaValidation";
import { ProjectFormData, ServerActionState } from "@root/common.types";
import { uploadImage } from "@/app/api/cloudinary.actions";

export async function uploadProject(
  prevState: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> {
  try {
    // convert back to ProjectForm and validate with Zod
    const projectFormValue = Object.fromEntries(formData) as ProjectFormData;
    const validatedFields = ProjectFormSchema.safeParse(projectFormValue);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        status: "Failure",
        error: "SubmitForm value is invalid",
      };
    }

    const {
      title,
      description,
      siteUrl,
      githubUrl,
      content,
      imageFile,
      stack,
    } = validatedFields.data;

    if (typeof imageFile !== "string" || imageFile === "") {
      return {
        status: "Failure",
        error: "Image is required or invalid",
      };
    }
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
        siteUrl,
        stack: stackArray,
        githubUrl,
        content,
        owner: {
          connect: {
            id: "649c7484735a162a66509481", // connect in relation to adminUser
          },
        },
      },
    });

    revalidatePath("/projects");

    return {
      ...prevState,
      status: "Success",
    };
  } catch (err) {
    console.error(err);
    return {
      status: "Failure",
      error: "Internal Error please try again later.",
    };
  }
}
