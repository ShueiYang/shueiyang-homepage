import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kim Nguyen - Contact",
  description: `Kim"s website`,
}


export default function ContactLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}