import { deleteImage, uploadImage } from "@/app/api/cloudinary.actions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ParamsRoute {
    params: { id: string }
}
interface UpdateProps {
    cloudImage: ImageProps,
    stackArray: string[]
}

export async function PUT(request: Request, {params}: ParamsRoute) {
    try {
        const id = params.id;
        // desctructure the key from formData
        const formData = await request.formData();
        const {
            title,
            description,
            siteUrl,
            githubUrl,
            content
        } = Object.fromEntries(formData) as unknown as Portfolio

        const imageFile = formData.get("imageFile") as string | null
        const stack = formData.get("stack") as string | null
        const updateData = {} as UpdateProps;

        const resultFound = await prisma.project.findUnique({
            where: {id},
            include: {
                images: true, // Include the associated images
            }
        }) 
        if(!resultFound) {
            return NextResponse.json(
                { message: "project not found!" }, { status: 404 }      
            )
        }
        
        if(imageFile) {
            const folderName = resultFound.title.replace(/\s/g, ""); 
            updateData.cloudImage = await uploadImage(imageFile, folderName);
        }
        if(stack) {
            updateData.stackArray = stack.split(",");
        }
        
        await prisma.project.update({
            where: {id},
            data: {
                title: title || undefined,
                description: description || undefined,
                images: imageFile ? {create: [updateData.cloudImage]} : undefined,
                siteUrl,
                stack: stack ? updateData.stackArray : undefined,
                githubUrl,
                content
            }
        })
     
        return NextResponse.json(
            { message: "project successfully updated!" }, { status: 200 }      
        )
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Error please try again later." },
            { status: 500 }
        );      
    }    
};



export async function DELETE(request: Request, {params}: ParamsRoute) {
    try {
        const id = params.id;

        const resultFound = await prisma.project.findUnique({ where: {id}}) 
        if(!resultFound) {
            return NextResponse.json(
                { message: "project not found!" }, { status: 404 }      
            )
        }
        // delete image from cloudinary
        const folderName = resultFound.title.replace(/\s/g, "");      
        await deleteImage(folderName); 
        // delete project
        await prisma.project.delete({where: {id}})
   
        return NextResponse.json(
            { message: "project successfully deleted!" }, { status: 200 }      
        )
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Error please try again later." },
            { status: 500 }
        );      
    }    
};