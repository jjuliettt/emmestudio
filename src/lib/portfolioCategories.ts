// Scritta al centro della copertina, sul modello delle copertine di
// alisabethdesigns.com (stile, non loghi né nomi):
// - "arch": finestra ad arco (angoli in alto arrotondati, base piatta),
//   cornice sottile ad arco e il nome al centro
// - "stacked": lettere grandi a coppie una sotto l'altra, etichette piccole
//   ai lati e una parola in corsivo tra due righe sottili
// - "monogram": un segno in corsivo tra due parole, poi il nome in
//   grassetto su due righe della stessa misura
export type CoverLettering =
  | { kind: "arch" }
  | { kind: "stacked"; labels: [string[], string[], string[]]; script: string }
  | { kind: "monogram"; mark: string; flank: [string, string] };

export type PortfolioCategory = {
  title: string;
  href: string;
  // foto della copertina (tagliata quasi quadrata, 8:9)
  src: string;
  alt: string;
  lettering: CoverLettering;
};

// Placeholder: foto di gattini, da sostituire con le copertine reali.
// Usate sia dalla home sia dalla pagina /portfolio.
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    title: "Private",
    href: "/portfolio/private",
    src: "https://placecats.com/neo/800/900",
    alt: "Private sessions cover",
    lettering: { kind: "arch" },
  },
  {
    title: "Events",
    href: "/portfolio/events",
    src: "https://placecats.com/poppy/800/900",
    alt: "Events cover",
    lettering: {
      kind: "stacked",
      labels: [
        ["Photo", "graphy"],
        ["For", "every"],
        ["Big", "moment"],
      ],
      script: "by Elisa",
    },
  },
  {
    title: "Small Businesses",
    href: "/portfolio/small-businesses",
    src: "https://placecats.com/louie/800/900",
    alt: "Small Businesses cover",
    lettering: { kind: "monogram", mark: "em", flank: ["Cafés", "Brands"] },
  },
];
