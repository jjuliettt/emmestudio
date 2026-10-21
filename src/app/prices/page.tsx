import type { Metadata } from "next";
import Booking from "@/components/Booking/Booking";
import Faq from "@/components/Faq/Faq";
import PageTitle, { PageLead } from "@/components/PageTitle/PageTitle";
import PriceGuideForm from "@/components/Prices/PriceGuideForm";
import ScrollLink from "@/components/Prices/ScrollLink";
import { GUIDE_CATEGORIES, PRICE_GUIDE_ID, type GuideCategory } from "@/lib/forms";
import styles from "./PricesPage.module.css";

// Titolo della scheda: "Prices | Elisa Massetti Photo" (modello in layout.tsx)
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

const FAQ = [
  {
    question: "How do I book a session?",
    answer:
      "Get in touch through the contact form or by email, and tell me a little about what you have in mind. We'll discuss your needs, find the right package and agree on the details before confirming your booking.",
  },
  {
    question: "When will I receive my photos?",
    answer:
      "Your edited photos will be delivered through a private download link in high resolution. Delivery times depend on the type of shoot, with most galleries ready within 7–10 working days.",
  },
  {
    question: "What if it rains?",
    answer:
      "No stress. If bad weather affects an outdoor private session, we'll simply reschedule for another day, free of charge.",
  },
  {
    question: "Can I use my photos online?",
    answer:
      "Of course! Personal sessions include sharing on your personal social media, while business and event packages include use on your website, social media and other agreed communication channels. Commercial use of personal portraits isn't included.",
  },
];

// Righe centrate, una frase per riga
function Lines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={`${styles.lines} ${className ?? ""}`}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

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

// I link al modulo della guida, con la categoria preselezionata: stesso
// stile in tutte e tre le sezioni (le distanze le dà la sezione)
function GuideLink({
  category,
  className,
  children,
}: {
  category: GuideCategory;
  className: string;
  children: string;
}) {
  return (
    <ScrollLink
      href={`#${PRICE_GUIDE_ID}`}
      category={category}
      className={`u-link ${className}`}
    >
      {children}
    </ScrollLink>
  );
}

export default function PricesPage() {
  return (
    <>
      {/* ---------- Intro e menu delle categorie ---------- */}
      <section className={styles.intro}>
        <PageTitle>Prices</PageTitle>
        <PageLead
          lines={[
            "Choose the session that fits you.",
            "The full price list is one email away.",
          ]}
        />

        <nav aria-label="Categories" className={styles.menu}>
          <ul className={styles.menuList}>
            {GUIDE_CATEGORIES.map((category) => (
              <li key={category.value}>
                <ScrollLink
                  href={`#${category.sectionId}`}
                  className={`u-link ${styles.menuLink}`}
                >
                  {category.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ---------- Private ---------- */}
      <section id="private" className={styles.category} data-tone="cream" tabIndex={-1}>
        <div className={styles.head}>
          <h2 className={styles.title}>Private</h2>
          <GuideLink category="private" className={styles.from}>
            Starting at €150
          </GuideLink>
        </div>

        <Cards packages={PRIVATE} />

        <Lines
          lines={[
            "Any extra information, prices, travel and payment terms are in the full guide.",
          ]}
        />
        <GuideLink category="private" className={styles.button}>
          Get the full guide
        </GuideLink>
      </section>

      {/* ---------- Small Businesses ---------- */}
      <section
        id="small-businesses"
        className={styles.category}
        data-tone="beige"
        tabIndex={-1}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>Small Businesses</h2>
          <GuideLink category="small-businesses" className={styles.from}>
            Starting at €295
          </GuideLink>
        </div>

        <Lines
          lines={[
            "Free 30-minute consultation at your place.",
            "No obligation.",
            "You get a written shot list and a fixed quote.",
          ]}
        />

        <Cards packages={SMALL_BUSINESSES} />

        <Lines
          lines={[
            "Team portraits available.",
            "Seasonal Formula: four sessions a year, one every season.",
            "Ask for details.",
          ]}
        />
        <GuideLink category="small-businesses" className={styles.button}>
          Get the full guide
        </GuideLink>
      </section>

      {/* ---------- Companies & Events: nessun prezzo ---------- */}
      <section
        id="companies-events"
        className={styles.category}
        data-tone="cream"
        tabIndex={-1}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>Companies &amp; Events</h2>
        </div>

        <Lines
          lines={[
            "Every company and event is different. Tell me about your event, how long it lasts and your budget, and I'll build a quote that fits.",
          ]}
        />
        <Lines
          lines={[
            "Conferences · team days · product launches · team portraits and LinkedIn photos.",
          ]}
        />
        <GuideLink category="companies-events" className={styles.button}>
          Tell me about your event
        </GuideLink>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>FAQ</h2>
        <Faq items={FAQ} />
      </section>

      {/* ---------- Modulo della guida prezzi ---------- */}
      <section
        id={PRICE_GUIDE_ID}
        className={styles.guide}
        tabIndex={-1}
        aria-labelledby="price-guide-title"
      >
        <h2 id="price-guide-title" className={styles.guideTitle}>
          Get the full price guide
        </h2>
        <p className={styles.guideLead}>
          All packages, extras and conditions, sent straight to your inbox as a
          PDF you can save.
        </p>
        <PriceGuideForm />
      </section>

      {/* qui "See prices" porterebbe alla pagina stessa */}
      <Booking onPricesPage />
    </>
  );
}
