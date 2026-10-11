export type PortfolioCategory = {
  title: string;
  href: string;
  // foto verticale 2:3
  src: string;
  alt: string;
  // Soggetto scontornato: PNG trasparente con lo stesso taglio di src.
  // Va sopra la testata, così il titolo resta dietro al soggetto.
  cutout?: string;
};

// Placeholder: foto di gattini, da sostituire con le copertine reali
// (foto + soggetto scontornato). Usate sia dal carosello in home sia
// dalla pagina /portfolio.
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    title: "Portraits",
    href: "/portfolio/portraits",
    src: "https://placecats.com/neo/800/1200",
    alt: "Portraits cover",
  },
  {
    title: "Events",
    href: "/portfolio/events",
    src: "https://placecats.com/poppy/800/1200",
    alt: "Events cover",
  },
  {
    title: "Small Businesses",
    href: "/portfolio/small-businesses",
    src: "https://placecats.com/louie/800/1200",
    alt: "Small Businesses cover",
  },
];
