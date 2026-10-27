import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BackToTop from "@/components/BackToTop/BackToTop";
import { SITE_URL } from "@/lib/contacts";
import { menuSans, spectral, tangerine } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  // il dominio del sito: gli indirizzi canonici delle pagine e l'immagine
  // dell'anteprima partono da qui
  metadataBase: new URL(SITE_URL),
  // anteprima quando si condivide un link (WhatsApp, Facebook...): titolo e
  // descrizione sono quelli della pagina, la foto è quella del booking
  openGraph: {
    type: "website",
    siteName: "Elisa Massetti Photo",
    locale: "en_GB",
    images: [{ url: "/images/booking.jpg", width: 2000, height: 1333 }],
  },
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
      className={`${spectral.variable} ${tangerine.variable} ${menuSans.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
