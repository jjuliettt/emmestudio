import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { menuSans, spectral, spectralBoldItalic } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elisa Massetti Photo | Photographer in Belgium",
    template: "%s | Elisa Massetti Photo",
  },
  description:
    "Elisa Massetti, Italian photographer based in Belgium: natural, colourful photos of people, events and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${spectralBoldItalic.variable} ${menuSans.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
