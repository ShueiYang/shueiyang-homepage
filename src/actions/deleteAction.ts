"use server";

import { prisma } from "@/lib/prisma";
import { ProjectData, ServerActionState } from "@root/common.types";
import { deleteImage } from "@/app/api/cloudinary.actions";

export async function deleteProject(
  prevState: ServerActionState,
  projectId: string,
): Promise<ServerActionState> {
  try {
    const resultFound: ProjectData | null = await prisma.project.findUnique({
      where: { id: projectId },
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

    // delete image from cloudinary
    if (resultFound.images.length) {
      const folderPath = resultFound.images[0]!.folder;
      await deleteImage(folderPath);
    }
    // delete project
    await prisma.project.delete({ where: { id: projectId } });

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
