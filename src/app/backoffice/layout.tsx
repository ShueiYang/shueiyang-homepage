import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kim - Admin Dashboard",
  description: `Backoffice`,
}


export default function BackofficeLayout({
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