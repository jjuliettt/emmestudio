import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { captionSans, displaySerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmestudio",
  description: "Sito Emmestudio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${displaySerif.variable} ${captionSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
