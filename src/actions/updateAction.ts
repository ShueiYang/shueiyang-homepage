"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EditFormSchema } from "@/validator/schemaValidation";
import {
  ImageDataType,
  ImageProps,
  ProjectData,
  ProjectForm,
  ServerActionState,
} from "@root/common.types";
import { uploadImage } from "@/app/api/cloudinary.actions";

interface UpdateProps {
  oldAssetId: string;
  cloudImage: ImageProps;
  stackArray: string[];
}

export async function updateProject(
  prevState: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> {
  try {
    const projectFormValue = Object.fromEntries(formData) as ProjectForm;
    const validatedFields = EditFormSchema.safeParse(projectFormValue);

    if (!validatedFields.success) {
      return {
        status: "Failure",
        error: "SubmitForm value is invalid",
      };
    }

    const {
      id,
      title,
      description,
      siteUrl,
      githubUrl,
      content,
      imageFile,
      stack,
    } = validatedFields.data;

    const updateData = {} as UpdateProps;

    const resultFound: ProjectData | null = await prisma.project.findUnique({
      where: { id },
      include: {
        images: true, // Include the associated images
      },
    });

    if (!resultFound) {
      return {
        status: "Failure",
        error: "Project not found!",
      };
    }

    if (imageFile && typeof imageFile === "string") {
      const imageData = resultFound.images.at(0) ?? ({} as ImageDataType);

      updateData.oldAssetId = imageData.id;
      const publicId = imageData.public_id;
      const folderPath = imageData.folder;
      updateData.cloudImage = await uploadImage(
        imageFile,
        folderPath,
        publicId,
      );
    }
    if (stack) {
      updateData.stackArray = stack.split(", ");
    }

    await prisma.project.update({
      where: { id },
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
        content: content || undefined,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/projects/[projectId]", "page");

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
