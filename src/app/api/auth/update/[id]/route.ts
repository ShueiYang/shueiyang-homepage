import { Portfolio, ImageProps } from "@root/common.types";
import { ParamsRoute } from "@/app/backoffice/dashboard/[id]/page";
import { NextResponse } from "next/server";
import { deleteImage, uploadImage } from "@/app/api/cloudinary.actions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateProps {
    oldAssetId: string,
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
        const updateData = {} as UpdateProps

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
            updateData.oldAssetId = resultFound.images[0].id
            const publicId = resultFound.images[0].public_id
            const folderPath = resultFound.images[0].folder
            updateData.cloudImage = await uploadImage(imageFile, folderPath, publicId);
        }
        if(stack) {
            updateData.stackArray = stack.split(", ");
        }
        
        await prisma.project.update({
            where: {id},
            data: {
                title: title || undefined,
                description: description || undefined,
                images: imageFile ? {
                    update: {
                      where: {id: updateData.oldAssetId},
                      data: updateData.cloudImage
                    }
                }     
                : undefined,
                siteUrl,
                stack: stack ? updateData.stackArray : undefined,
                githubUrl,
                content,
            },
        })
        // call the revalidate path but it's not working as expected...
        revalidatePath("/projects");

        return NextResponse.json(
            { message: "Project successfully updated!" }, { status: 200 }      
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
        console.log("DELETE ROUTE ID", id)
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
        // delete image from cloudinary
        if(resultFound.images.length) {
            const folderPath = resultFound.images[0].folder;   
            await deleteImage(folderPath); 
        }
        // delete project
        await prisma.project.delete({where: {id}})

        // call the revalidate path but it's not working as expected...
        revalidatePath("/projects");
    
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