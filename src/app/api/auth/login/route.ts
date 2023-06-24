import { NextResponse } from "next/server";
import { cookies } from "next/headers"
import { signJWT } from "@/lib/auth";

interface AdminUser {
    username: string,
    password: string,
}

function getCredential() {
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD    
    if(!adminUser || !adminPassword) {
        throw new Error("Credentials are not set")
    }
    return {
        adminUser,
        adminPassword,
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as unknown as AdminUser
        const { username, password } = body 
        const { adminUser, adminPassword } = getCredential();
        
        if( username !== adminUser || password !== adminPassword) {
            return NextResponse.json(
                { message: "Access denied" },
                { status: 401 }     
            );
        }
        
        // sign up the jwt
        const token = await signJWT(
            { username, },
            { expiresIn: "1d"}
        );

        cookies().set({
            name: "shueiJWT",
            value: token,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        })  
        const resp = {
            message: "Authenticate!"
        }
        return new Response(JSON.stringify(resp), {
            status: 200,
        })
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