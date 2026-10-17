import type { Metadata } from "next";
import Booking from "@/components/Booking/Booking";
import Faq from "@/components/Faq/Faq";
import HandTitle from "@/components/HandTitle/HandTitle";
import PriceGuideForm from "@/components/Prices/PriceGuideForm";
import ScrollLink from "@/components/Prices/ScrollLink";
import { GUIDE_CATEGORIES, PRICE_GUIDE_ID, type GuideCategory } from "@/lib/forms";
import styles from "./PricesPage.module.css";

// Titolo della scheda: "Prices | Emme Studio" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Prices",
  description:
    "Prices 2026 for private sessions, small businesses, companies and events. Request the full price guide by email.",
};

type Package = {
  name: string;
  duration: string;
  photos: string;
  text: string;
  // la formula più scelta: fondo espresso e la targhetta "most chosen"
  featured?: boolean;
};

const PRIVATE: Package[] = [
  {
    name: "Basis",
    duration: "1 hour",
    photos: "10 edited photos",
    text: "A short, relaxed session. Perfect for a portrait or a small family moment.",
  },
  {
    name: "Classic",
    duration: "1.5 hours",
    photos: "20 edited photos",
    text: "Time to warm up and try different spots and poses.",
    featured: true,
  },
  {
    name: "Extended",
    duration: "2 hours",
    photos: "25 edited photos",
    text: "More variety: outfits, locations, the whole family.",
  },
];

const SMALL_BUSINESSES: Package[] = [
  {
    name: "Refresh",
    duration: "1.5 hours",
    photos: "20 photos",
    text: "Drinks, a few signature dishes and interior details for your menu and socials.",
  },
  {
    name: "In Focus",
    duration: "3 hours",
    photos: "40 photos",
    text: "The complete story: interior, food and drinks, your team at work, exterior and details.",
    featured: true,
  },
  {
    name: "Full Day",
    duration: "6 hours",
    photos: "70 photos",
    text: "Everything, plus daylight and evening atmosphere, terrace and full menu.",
  },
];

const EVENT_TYPES = [
  "Conferences",
  "Team days",
  "Product launches",
  "Team portraits",
  "LinkedIn photos",
];

// Testi provvisori (tranne i titoli), da confermare con Elisa
const REASONS = [
  {
    title: "Fixed prices, no surprises",
    text: "The price in the guide is the price you pay. Any extra is agreed with you first.",
  },
  {
    title: "Delivery in 7–10 working days",
    text: "Your edited photos are ready within 7 to 10 working days of the session.",
  },
  {
    title: "Private online gallery",
    text: "View, download and share your photos from your own private gallery.",
  },
];

const FAQ = [
  {
    question: "What if it rains?",
    answer: "We move the session to another day that suits you, or find a covered spot nearby.",
  },
  {
    question: "How does booking work?",
    answer: "Get in touch, we pick a date together and I confirm everything by email.",
  },
  {
    question: "How fast do I get my photos?",
    answer: "Within 7 to 10 working days, in a private online gallery where you can download them.",
  },
];

function Cards({ packages }: { packages: Package[] }) {
  return (
    <ul className={styles.cards}>
      {packages.map((item) => (
        <li
          key={item.name}
          className={styles.card}
          data-featured={item.featured || undefined}
        >
          {item.featured && <span className={styles.tag}>most chosen</span>}
          <h3 className={styles.cardName}>{item.name}</h3>
          <p className={styles.cardMeta}>
            <span>{item.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{item.photos}</span>
          </p>
          <p className={styles.cardText}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function GuideButton({ category, children }: { category: GuideCategory; children: string }) {
  return (
    <ScrollLink href={`#${PRICE_GUIDE_ID}`} category={category} className={styles.button}>
      {children}
    </ScrollLink>
  );
}

export default function PricesPage() {
  return (
    <>
      {/* ---------- Intro ---------- */}
      <section className={styles.intro}>
        <p className={styles.kicker}>Prices 2026</p>
        <h1 className={styles.heading}>Simple, honest pricing.</h1>
        <p className={styles.lead}>
          Choose the session that fits you. The full price list is one email
          away.
        </p>
        <nav aria-label="Categories">
          <ul className={styles.jump}>
            {GUIDE_CATEGORIES.map((category) => (
              <li key={category.value}>
                <ScrollLink href={`#${category.sectionId}`} className={styles.jumpLink}>
                  {category.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ---------- Private ---------- */}
      <section id="private" className={styles.category} tabIndex={-1}>
        <HandTitle lines={["Private"]} className={styles.title} />
        <p className={styles.from}>Starting at €150</p>

        <Cards packages={PRIVATE} />

        <p className={styles.note}>
          Extra photos, travel and payment terms are in the full guide.
        </p>
        <GuideButton category="private">Get the full guide</GuideButton>
      </section>

      {/* ---------- Small Businesses ---------- */}
      <section id="small-businesses" className={styles.category} tabIndex={-1}>
        <HandTitle lines={["Small", "Businesses"]} className={styles.title} />
        <p className={styles.from}>Starting at €295</p>

        <p className={styles.highlight}>
          Free 30-minute consultation at your place. No obligation. You get a
          written shot list and a fixed quote.
        </p>

        <Cards packages={SMALL_BUSINESSES} />

        <div className={styles.teasers}>
          <p>Team portraits available</p>
          <p>
            Seasonal Formula: four sessions a year, one every season. Ask for
            details.
          </p>
        </div>
        <GuideButton category="small-businesses">Get the full guide</GuideButton>
      </section>

      {/* ---------- Companies & Events: nessun prezzo ---------- */}
      <section id="companies-events" className={styles.category} tabIndex={-1}>
        <HandTitle lines={["Companies", "& Events"]} className={styles.title} />

        <p className={styles.text}>
          Every company and event is different. Tell me about your event, how
          long it lasts and your budget, and I&apos;ll build a quote that fits.
        </p>

        <ul className={styles.types} aria-label="For example">
          {EVENT_TYPES.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>

        <GuideButton category="companies-events">Tell me about your event</GuideButton>
      </section>

      {/* ---------- Why book with me ---------- */}
      <section className={styles.why}>
        <h2 className={styles.sectionTitle}>Why book with me</h2>
        <ul className={styles.reasons}>
          {REASONS.map((reason) => (
            <li key={reason.title}>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonText}>{reason.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={styles.faq}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        <Faq items={FAQ} />
      </section>

      {/* ---------- Modulo della guida prezzi ---------- */}
      <section
        id={PRICE_GUIDE_ID}
        className={styles.guide}
        tabIndex={-1}
        aria-labelledby="price-guide-title"
      >
        <HandTitle
          id="price-guide-title"
          lines={["Get the full", "price guide"]}
          className={styles.guideTitle}
        />
        <p className={styles.guideLead}>
          All packages, extras and conditions, sent straight to your inbox as a
          PDF you can save.
        </p>
        <PriceGuideForm />
      </section>

      {/* qui "See prices" porterebbe alla pagina stessa: al suo posto il
          portfolio */}
      <Booking second={{ href: "/portfolio", label: "See portfolio" }} />
    </>
  );
}
