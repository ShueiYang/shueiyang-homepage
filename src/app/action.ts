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


export async function getCredential() {
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