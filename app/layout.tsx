import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "GYM ON - Find the Perfect Gym Near You",
  description: "Search nearby gyms, compare day-pass prices, and request entry in minutes. Access every gym with GYM ON.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-[#00b4d8] selection:text-slate-950">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

