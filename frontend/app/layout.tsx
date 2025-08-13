import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import StoreUser from "@/components/StoreUser";
import { getuser } from "@/lib/actions/getuser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getuser()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <StoreUser userid={userId}/>
        {children}
      </body>
    </html>
  );
}
