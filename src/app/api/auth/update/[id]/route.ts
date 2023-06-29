import { deleteImage } from "@/app/api/cloudinary.actions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ParamsRoute {
    params: { id: string }
}

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