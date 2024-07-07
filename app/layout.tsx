"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import WhatsApp from "@/components/WhatsApp";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar scrollbar-none sm:scrollbar-thin">
      <head>
        <title>Threadika</title>
        <link rel="icon" href="/logo.png" />
      </head>

      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#212F38",
                color: "#FDF8EC",
              },
            }}
          />
          <WhatsApp />
        </SessionProvider>
      </body>
    </html>
  );
}
