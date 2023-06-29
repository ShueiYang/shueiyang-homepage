import { uploadImage } from "@/app/api/cloudinary.actions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

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
        const stackArray = stack.split(",");

        console.log("CHECK ", stackArray);
       
        const folderName = title.replace(/\s/g, "");
        const cloudImage = await uploadImage(imageFile, folderName);

            
        await prisma.project.create({
            data: {
                title,
                description,
                images: {
                    create: [cloudImage]
                },
                siteUrl: siteUrl || "",
                stack: stackArray,
                githubUrl,
                content: content || "",
                owner: {
                    connect: {
                        id: "649c7484735a162a66509481"
                    }
                }
            }
        })
    
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