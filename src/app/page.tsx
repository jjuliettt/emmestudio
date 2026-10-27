import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Reviews from "@/components/Reviews/Reviews";
import Booking from "@/components/Booking/Booking";
import { heroSlides } from "@/lib/heroSlides";
import { BRAND, EMAIL, SITE_URL } from "@/lib/contacts";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import type { Metadata } from "next";

// titolo e descrizione: quelli di base in layout.tsx
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Dati strutturati per Google (schema.org): chi è, dove lavora, cosa fa.
// Invisibili sul sito. La zona è Antwerp, dove Elisa vive e lavora;
// l'indirizzo della partita IVA (Scherpenheuvel-Zichem) resta solo nella
// privacy policy.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND,
  url: SITE_URL,
  image: `${SITE_URL}/images/booking.jpg`,
  description:
    "Elisa Massetti, Italian photographer based in Antwerp, Belgium: natural, colourful photos of people, events and small businesses.",
  email: EMAIL,
  telephone: "+32 492 83 61 90",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Antwerp",
    addressCountry: "BE",
  },
  areaServed: { "@type": "Country", name: "Belgium" },
  founder: {
    "@type": "Person",
    name: "Elisa Massetti",
    jobTitle: "Photographer",
    knowsLanguage: ["it", "en", "de", "es"],
  },
  knowsAbout: PORTFOLIO_CATEGORIES.map((category) => `${category.title} photography`),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      {/* lo slideshow: tutte le foto orizzontali del portfolio */}
      <Hero slides={heroSlides()} />
      <About />
      <Portfolio />
      <Reviews />
      {/* dopo la fascia beige delle recensioni */}
      <Booking after="beige" />
    </>
  );
}
