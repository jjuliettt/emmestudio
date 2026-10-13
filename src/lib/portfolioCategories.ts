export type PortfolioCategory = {
  title: string;
  href: string;
  // foto della copertina (tagliata 4:5)
  src: string;
  alt: string;
};

// Placeholder: foto di gattini, da sostituire con le copertine reali.
// Usate sia dalla home sia dalla pagina /portfolio.
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    title: "Portraits",
    href: "/portfolio/portraits",
    src: "https://placecats.com/neo/800/1000",
    alt: "Portraits cover",
  },
  {
    title: "Events",
    href: "/portfolio/events",
    src: "https://placecats.com/poppy/800/1000",
    alt: "Events cover",
  },
  {
    title: "Small Businesses",
    href: "/portfolio/small-businesses",
    src: "https://placecats.com/louie/800/1000",
    alt: "Small Businesses cover",
  },
];
