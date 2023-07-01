import { NextResponse } from "next/server";
import { cookies } from "next/headers"
import { signJWT } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(req: Request) {
    try {
        const body = await req.json() as unknown as AdminForm
        const { username, password } = body 
    
        const adminUser = await prisma.adminUser.findUnique({
            where: {username}
        })
        if(adminUser === null) {
            return NextResponse.json(
                { message: "Access Denied"},
                { status: 401 }     
            );
        }
        // compare the password with hash...
        const match = await bcrypt.compare(password, adminUser.userhash);
        if(!match) {
            return NextResponse.json(
                { message: "Access Denied"},
                { status: 401 }     
            );  
        } 
        // sign up the jwt
        const token = await signJWT(
            { username, },
            getJwtSecret()
        );

        cookies().set({
            name: "shueiJWT",
            value: token,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 12, // 12hours
            secure: process.env.NODE_ENV === "production",
            path: "/"
        })  
        const resp = {
            message: "Authenticate!"
        }
        return new Response(JSON.stringify(resp), {status: 200});
        
    } catch (err) {
        console.error(err);
        if((err as Error).message === "Credentials are not set") {
            return NextResponse.json(
                { message: "Access denied - Server configuration error" },
                { status: 401 }
            );
        } else {  
            return NextResponse.json(
                { message: "Internal Error please try again later." },
                { status: 500 }
            );      
        }
    }    
};


// get the jwt secret
 function getJwtSecret() {
    const secret = process.env.JWT_SECRET
    if(!secret) {
        throw new Error("JWT_SECRET is not set")
    }
    return secret;
  }