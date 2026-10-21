import type { Metadata } from "next";
import Link from "next/link";
import Booking from "@/components/Booking/Booking";
import CategoryNav from "@/components/CategoryNav/CategoryNav";
import Gallery from "@/components/Gallery/Gallery";
import PageTitle, { PageLead } from "@/components/PageTitle/PageTitle";
import { categoryPhotos } from "@/lib/categoryPhotos";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import styles from "./CategoryPage.module.css";

// Una pagina per ogni copertina: /portfolio/private, /portfolio/events,
// /portfolio/small-businesses (prese dall'indirizzo delle copertine)
const slugOf = (href: string) => href.split("/").pop()!;
const findCategory = (slug: string) =>
  PORTFOLIO_CATEGORIES.find((category) => slugOf(category.href) === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return PORTFOLIO_CATEGORIES.map((category) => ({ category: slugOf(category.href) }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = findCategory((await params).category)!;
  return {
    title: `${category.title} | Portfolio`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).category;
  const category = findCategory(slug)!;
  // in giro: dopo l'ultima si torna alla prima, prima della prima c'è l'ultima
  const index = PORTFOLIO_CATEGORIES.indexOf(category);
  const count = PORTFOLIO_CATEGORIES.length;
  const previous = PORTFOLIO_CATEGORIES[(index - 1 + count) % count];
  const next = PORTFOLIO_CATEGORIES[(index + 1) % count];

  return (
    <>
      <section className={styles.page}>
        <Link href="/portfolio" className={`u-link ${styles.back}`}>
          Back to portfolio
        </Link>

        <div className={styles.title}>
          <PageTitle>{category.title}</PageTitle>
          <PageLead lines={[category.description]} />
        </div>

        <Gallery photos={categoryPhotos(slug)} label={category.title} />

        <div className={styles.others}>
          <CategoryNav previous={previous} next={next} />
        </div>
      </section>

      <Booking />
    </>
  );
}
