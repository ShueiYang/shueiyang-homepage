import "./globals.css";
import type { Metadata } from "next";
import { Roboto, IBM_Plex_Sans } from "next/font/google";
// import Head from "next/head"
// import Script from "next/script"
import ThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import CandleStickLoader from "@/components/model3D/CandleStick.Loader";
// import AnimationLayout from "@/components/layouts/AnimateLayout"

const ChineseCandleStick = dynamic(
  () => import("@/components/model3D/ChineseCandleStick"),
  {
    ssr: false,
    loading: () => <CandleStickLoader />,
  },
);

export const metadata: Metadata = {
  title: "Kim Nguyen - Homepage",
  description: `Kim"s website`,
  authors: [
    { name: "Kim Nguyen" },
    { name: "Shueiyang", url: "https://shueiyang.vercel.app" },
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-robo",
});
const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-ibm",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {/* <Head>
        <Script src="/script/theme.js" strategy="beforeInteractive"/>   
      </Head> */}
      <body className="break-words bg-orange-50 leading-6 text-zinc-900 transition-colors duration-500 dark:bg-black-russ dark:text-slate-200">
        <ThemeProvider>
          <main
            className={`${roboto.className} ${ibmPlex.variable} ${roboto.variable}`}
          >
            <Navbar />
            <section className="container grow px-8 pt-14">
              <ChineseCandleStick />
              {/* <AnimationLayout> */}
              {children}
              {/* </AnimationLayout> */}
            </section>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
