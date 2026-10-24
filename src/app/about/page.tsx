import type { Metadata } from "next";
import About from "@/components/About/About";
import Booking from "@/components/Booking/Booking";
import PageTitle from "@/components/PageTitle/PageTitle";
import styles from "./AboutPage.module.css";

// Titolo della scheda: "About | Elisa Massetti Photo" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "About",
  description:
    "Elisa Massetti, Italian photographer from Bergamo based in Belgium: who I am and how I work with people, businesses and events.",
};

// La pagina "About": il titolo, poi la fascia che prima stava in home
// (saluto, firma sulla foto, il testo intero) e il riquadro "Want to work
// together"
export default function AboutPage() {
  return (
    <>
      <section className={styles.intro}>
        <PageTitle>About me</PageTitle>
      </section>

      <About />

      <Booking />
    </>
  );
}
