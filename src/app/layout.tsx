import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { LICENSED_FONTS, publicFileExists } from "@/lib/publicFiles";
import { handwriting, menuSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Emme Studio | Photographer in Belgium",
    template: "%s | Emme Studio",
  },
  description:
    "Elisa Massetti, Italian photographer based in Belgium: natural, colorful photos of people, events and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // si precaricano solo i font con licenza già presenti in public/webfonts/
  const fonts = LICENSED_FONTS.filter(publicFileExists);

  return (
    <html
      lang="en"
      className={`${menuSans.variable} ${handwriting.variable}`}
    >
      <head>
        {fonts.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
