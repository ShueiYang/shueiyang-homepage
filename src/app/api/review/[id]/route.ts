import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export interface ParamsRoute {
    params: { id: string }
}


export async function GET(req: Request, {params}: ParamsRoute) {
    try {
        const id = params.id;
        const project = await prisma.project.findUnique({
            where: {id},
            include:{
              images: true  // Include the associated images
            },   
        })
        if(!project) {
            return NextResponse.json(
                { message: "Project not found!" }, { status: 404 }      
            )
        }      
        return NextResponse.json(project, {status: 200});

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Error please try again later." },
            { status: 500 }
        );  
    }    
};