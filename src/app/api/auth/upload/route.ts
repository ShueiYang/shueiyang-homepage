import { uploadImage } from "@/app/api/cloudinary.actions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Portfolio } from "../../../../../common.types";


export async function POST(request: Request) {
    try {
        // desctructure the key from formData
        const formData = await request.formData();
        const {
            title,
            description,
            siteUrl,
            githubUrl,
            content
        } = Object.fromEntries(formData) as unknown as Portfolio;
        
        const imageFile = formData.get("imageFile") as string
        const stack = formData.get("stack") as string
        // transform into array
        const stackArray = stack.split(", ");
        // upload to cloudinary
        const folderName = title.replace(/\s/g, "");
        const folderPath = `api/portfolio/${folderName}`
        const cloudImage = await uploadImage(imageFile, folderPath);
        
        // than create and save the document to the DB    
        await prisma.project.create({
            data: {
                title,
                description,
                images: {
                    create: [cloudImage]
                },
                siteUrl: siteUrl || "",
                stack: stackArray,
                githubUrl: githubUrl || "",
                content: content || "",
                owner: {
                    connect: {
                        id: "649c7484735a162a66509481"  // connect in relation to adminUser
                    }
                }
            }
        })
        // call the revalidate path but it's not working as expected...
        // const path = request.nextUrl.searchParams.get("path") || "/"
        revalidatePath("/projects");
    
        return NextResponse.json(
            { message: "project successfully insert!" }, { status: 201 }      
        )
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Error please try again later." },
            { status: 500 }
        );      
    }    
};