import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { HEAD_SCRIPT, seasonOf } from "@/lib/season";
import { captionSans, displaySerif, handScript } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmestudio",
  description: "Sito Emmestudio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-season (e data-style) vengono aggiornati dallo script nel <head>
    // prima dell'idratazione: da qui suppressHydrationWarning
    <html
      lang="en"
      data-season={seasonOf(new Date())}
      className={`${displaySerif.variable} ${captionSans.variable} ${handScript.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
