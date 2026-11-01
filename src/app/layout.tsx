import type { ReactNode } from "react";
import {Lato, Geist } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import AppProvider from "../providers/AppProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {

  metadataBase: new URL("https://dealport-web-4z5b.vercel.app/"),
  title: {
    default: "Dealper",
    template: "%s | Dealper",
  },
  description: "Dealper - Your one-stop shop for the best deals and discounts on a wide range of products. Find the latest offers and save big on your favorite items.",
  icons:{icon:'/img/logo.png'}
  ,

  openGraph: {
    type: "website",
    siteName: "Dealper",
    title: "Dealper",
    description: "Dealper - Your one-stop shop for the best deals and discounts on a wide range of products. Find the latest offers and save big on your favorite items.",
    url: "https://dealport-web-4z5b.vercel.app/",
    images: [
      {
        url: "/img/Dealport_TexnologiyaBittaJoyda.png",
        width: 1200,
        height: 630,
        alt: "Dealper - Your one-stop shop for the best deals and discounts on a wide range of products. Find the latest offers and save big on your favorite items.",
      },
    ],
    locale: "uz_UZ",
  },
  };



  const lato = Lato({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    weight:["100" , "300" ,"400" , "700" , "900" ]
  });



  export default function RootLayout({
    children,
  }: {
    children: ReactNode;
  }) {
    return (
      <html
        lang="uz"
        className={cn("h-full", "antialiased", lato.variable, "font-sans", geist.variable)}
      >
        <body className="min-h-full flex flex-col">
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    );
}