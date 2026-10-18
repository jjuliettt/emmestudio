import type { Metadata } from "next";
import Link from "next/link";
import Booking from "@/components/Booking/Booking";
import Gallery from "@/components/Gallery/Gallery";
import PageTitle from "@/components/PageTitle/PageTitle";
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
    description: `${category.title}: a selection of photographs by Elisa Massetti, photographer in Belgium.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).category;
  const category = findCategory(slug)!;
  const others = PORTFOLIO_CATEGORIES.filter((other) => other !== category);

  return (
    <>
      <section className={styles.page}>
        <Link href="/portfolio" className={`u-link ${styles.back}`}>
          Back to portfolio
        </Link>

        <div className={styles.title}>
          <PageTitle>{category.title}</PageTitle>
        </div>

        <Gallery photos={categoryPhotos(slug)} label={category.title} />

        <nav aria-label="Other categories" className={styles.others}>
          {others.map((other) => (
            <Link key={other.href} href={other.href} className={`u-link ${styles.link}`}>
              {other.title}
            </Link>
          ))}
        </nav>
      </section>

      <Booking />
    </>
  );
}
