"use server"
import { cookies } from "next/headers"


export async function logOut() {
  
  cookies().set({
    name: "shueiJWT",
    value: "",
    maxAge: -1,
    path: "/"
  })
}