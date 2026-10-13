// Scritta al centro della copertina, sul modello delle copertine di
// alisabethdesigns.com (stile, non loghi né nomi):
// - "classic": nome grande, riga spaziata sotto e una riga piccolissima
// - "stacked": lettere grandi a coppie una sotto l'altra, etichette piccole
//   ai lati e una parola in corsivo tra due righe sottili
// - "monogram": un segno piccolo tra due parole, poi la prima parola grande
//   e la seconda spaziata sotto
export type CoverLettering =
  | { kind: "classic"; subline: string; tiny: [string, string] }
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
    title: "Portraits",
    href: "/portfolio/portraits",
    src: "https://placecats.com/neo/800/900",
    alt: "Portraits cover",
    lettering: {
      kind: "classic",
      subline: "Elisa Massetti",
      tiny: ["2026", "Belgium"],
    },
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
      script: "by elisa",
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
