import type { Metadata } from "next";
import CoverList from "@/components/Portfolio/CoverList";
import PageTitle, { PageLead } from "@/components/PageTitle/PageTitle";
import Booking from "@/components/Booking/Booking";
import styles from "./PortfolioPage.module.css";

// Titolo della scheda: "Portfolio | Elisa Massetti Photo" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Private sessions, events and small businesses: a selection of photographs by Elisa Massetti, photographer in Belgium.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className={styles.page}>
        <PageTitle>Portfolio</PageTitle>
        <PageLead
          lines={[
            "From busy events to quieter moments in front of the camera, here’s a look at the people and stories I’ve had the chance to photograph.",
          ]}
        />

        {/* stesso spazio sopra (titolo → frase) e sotto (frase → copertine) */}
        <div className={styles.covers}>
          <CoverList />
        </div>
      </section>

      <Booking />
    </>
  );
}
