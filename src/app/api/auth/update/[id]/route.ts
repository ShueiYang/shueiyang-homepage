import { ImageProps, ProjectForm, ProjectData } from "@root/common.types";
import { ParamsRoute } from "@/app/backoffice/dashboard/[id]/page";
import { NextResponse } from "next/server";
import { deleteImage, uploadImage } from "@/app/api/cloudinary.actions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ImageDataType = {
  id: string;
  public_id: string;
  folder: string;
  secure_url: string;
  projectId: string;
};

interface UpdateProps {
  oldAssetId: string;
  cloudImage: ImageProps;
  stackArray: string[];
}

export async function PUT(request: Request, { params }: ParamsRoute) {
  try {
    const id = params.id;
    // desctructure the key from formData
    const formData = await request.formData();
    const {
      title,
      description,
      siteUrl,
      githubUrl,
      content,
      imageFile,
      stack,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = Object.fromEntries<any>(formData) as ProjectForm;

    const updateData = {} as UpdateProps;

    const resultFound: ProjectData | null = await prisma.project.findUnique({
      where: { id },
      include: {
        images: true, // Include the associated images
      },
    });

    if (!resultFound) {
      return NextResponse.json(
        { message: "project not found!" },
        { status: 404 },
      );
    }

    if (imageFile) {
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
        content,
      },
    });

    revalidatePath("/projects");

    return NextResponse.json(
      { message: "Project successfully updated!" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Error please try again later." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: ParamsRoute) {
  try {
    const id = params.id;

    const resultFound: ProjectData | null = await prisma.project.findUnique({
      where: { id },
      include: {
        images: true, // Include the associated images
      },
    });
    if (!resultFound) {
      return NextResponse.json(
        { message: "project not found!" },
        { status: 404 },
      );
    }
    // delete image from cloudinary
    if (resultFound.images.length) {
      const folderPath = resultFound.images[0]!.folder;
      await deleteImage(folderPath);
    }
    // delete project
    await prisma.project.delete({ where: { id } });

    revalidatePath("/projects");

    return NextResponse.json(
      { message: "project successfully deleted!" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Error please try again later." },
      { status: 500 },
    );
  }
}
