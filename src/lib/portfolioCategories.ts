// Scritta al centro della copertina, sul modello delle copertine di
// alisabethdesigns.com (stile, non loghi né nomi):
// - "image": copertina già finita (grafica di Elisa, 4:5), mostrata così
//   com'è: niente velatura, cornice o scritte aggiunte. "VIEW" compare sotto
//   la lineetta della grafica, in espresso o (viewInk: "cream") in crema
// - "stacked": lettere grandi a coppie una sotto l'altra, etichette piccole
//   ai lati e una parola in corsivo tra due righe sottili
// - "monogram": un segno in corsivo tra due parole, poi il nome in
//   grassetto su due righe della stessa misura
export type CoverLettering =
  | { kind: "image"; viewInk?: "cream" }
  | { kind: "stacked"; labels: [string[], string[], string[]]; script: string }
  | { kind: "monogram"; mark: string; flank: [string, string] };

export type PortfolioCategory = {
  title: string;
  // la frase sotto il titolo nella pagina della categoria
  description: string;
  href: string;
  // foto della copertina (tagliata quasi quadrata, 8:9; "image": 4:5)
  src: string;
  alt: string;
  lettering: CoverLettering;
};

// Le copertine fatte da Elisa, in quest'ordine (Small Businesses al centro).
// Usate sia dalla home sia dalla pagina /portfolio.
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    title: "Private",
    description:
      "Portraits that celebrate you, just as you are. From a confidence boost or a personal milestone to couples, families and the little moments worth remembering.",
    href: "/portfolio/private",
    src: "/images/portfolio/private-cover.webp",
    alt: "Private People: portraits, lifestyle, personal moments",
    lettering: { kind: "image" },
  },
  {
    title: "Small Businesses",
    description:
      "Photos that bring your business to life, from the spaces and products you create to the people and details that make it yours.",
    href: "/portfolio/small-businesses",
    src: "/images/portfolio/small-businesses-cover.webp",
    alt: "Small Businesses: cafés, shops, brands",
    // le parole piccole della grafica sono crema
    lettering: { kind: "image", viewInk: "cream" },
  },
  {
    // l'indirizzo resta /portfolio/events: così valgono i nomi delle foto
    // (REPLACE-ME_events-NN)
    title: "Companies & Events",
    description:
      "From corporate gatherings to community celebrations, I capture the interactions, expressions and spontaneous moments that bring an event to life.",
    href: "/portfolio/events",
    src: "/images/portfolio/events-cover.webp",
    alt: "Companies & Events: corporate, events, brand content",
    lettering: { kind: "image" },
  },
];
