"use server"
import { cookies } from "next/headers"

// testing server action

export async function logOut() {
  
  cookies().set({
    name: "shueiJWT",
    value: "",
    maxAge: -1,
    path: "/"
  })
}