import { displayMasthead } from "@/app/fonts";
import Cover from "@/components/Portfolio/Cover";
import Booking from "@/components/Booking/Booking";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import styles from "./PortfolioPage.module.css";

const YEAR = "2026";
const BYLINE = "Elisa Massetti";

// Foto diversa da quella usata in home per la stessa sezione (altro gatto).
const BOOKING_PHOTO_SRC = "https://placecats.com/bella/1000/1500";

export default function PortfolioPage() {
  return (
    <>
      <section className={styles.hero}>
        <p className={styles.kicker}>Elisa Massetti Photo</p>
        <h1 className={styles.title}>My Portfolio</h1>
      </section>

      <div className={`${styles.list} ${displayMasthead.className}`}>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <Cover
            key={category.href}
            category={category}
            year={YEAR}
            byline={BYLINE}
          />
        ))}
      </div>

      <Booking photoSrc={BOOKING_PHOTO_SRC} />
    </>
  );
}
