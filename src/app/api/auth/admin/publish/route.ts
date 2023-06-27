import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {
            title,
            description,
            image,
            url,
            stack,
            source,
            content
        }: Portfolio = await req.json() as unknown as Portfolio

        console.log("check stat", title, description);
        
        let imageArray = [];

        imageArray.push("http://imagecloudtest/api");
            
        await prisma.project.create({
            data: {
                title,
                description,
                image,
                url: url || "",
                stack,
                source,
                content: content || ""
            }
        })
    
        return NextResponse.json(
            { message: "project successfully insert!" }, { status: 201 }      
        )
        
    } catch (err) {
       console.error(err);        
    }    
};