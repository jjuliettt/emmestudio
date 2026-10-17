import type { Metadata } from "next";
import CoverList from "@/components/Portfolio/CoverList";
import PageTitle from "@/components/PageTitle/PageTitle";
import Booking from "@/components/Booking/Booking";
import styles from "./PortfolioPage.module.css";

// Titolo della scheda: "Portfolio | Elisa Massetti Photo" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Private sessions, events and small businesses: a selection of photographs by Elisa Massetti, photographer in Belgium.",
};

// Foto diversa da quella usata in home per la stessa sezione (altro gatto).
const BOOKING_PHOTO_SRC = "https://placecats.com/bella/1000/1500";

export default function PortfolioPage() {
  return (
    <>
      <section className={styles.page}>
        <PageTitle>Portfolio</PageTitle>

        <div className={styles.covers}>
          <CoverList />
        </div>
      </section>

      <Booking photoSrc={BOOKING_PHOTO_SRC} />
    </>
  );
}
