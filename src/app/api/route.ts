import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"


export async function GET(req: Request) {
    try {
        const results = await prisma.project.findMany({
            include:{
              images: true  
            },
            orderBy: {
              createAt: "desc" // Sort by most recent date
            }
        })   
        return NextResponse.json(results, {status: 200});

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Error please try again later." },
            { status: 500 }
        );  
    }    
};