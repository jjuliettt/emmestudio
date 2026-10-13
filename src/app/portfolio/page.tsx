import type { Metadata } from "next";
import CoverList from "@/components/Portfolio/CoverList";
import Booking from "@/components/Booking/Booking";
import styles from "./PortfolioPage.module.css";

// Titolo della scheda: "Portfolio | Emme Studio" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Portraits, events and small businesses: a selection of photographs by Elisa Massetti, photographer in Belgium.",
};

// Foto diversa da quella usata in home per la stessa sezione (altro gatto).
const BOOKING_PHOTO_SRC = "https://placecats.com/bella/1000/1500";

export default function PortfolioPage() {
  return (
    <>
      <section className={styles.page}>
        <h1 className={styles.title}>Portfolio</h1>

        <CoverList />
      </section>

      <Booking photoSrc={BOOKING_PHOTO_SRC} />
    </>
  );
}
