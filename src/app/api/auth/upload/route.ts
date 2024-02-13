import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadImage } from "@/app/api/cloudinary.actions";
import { revalidatePath } from "next/cache";
import { ProjectForm } from "@root/common.types";
import { ProjectFormSchema } from "@/validator/schemaValidation";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // convert back to ProjectForm and validate with Zod
    const projectFormValue = Object.fromEntries(formData) as ProjectForm;
    const validatedFields = ProjectFormSchema.safeParse(projectFormValue);

    if (!validatedFields.success) {
      return NextResponse.json({ message: "Invalid form" }, { status: 400 });
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
      return NextResponse.json(
        { message: "Image required or invalid" },
        { status: 400 },
      );
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

    return NextResponse.json(
      { message: "project successfully insert!" },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Error please try again later." },
      { status: 500 },
    );
  }
}
