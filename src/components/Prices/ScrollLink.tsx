"use client";

import type { MouseEvent, ReactNode } from "react";
import { GUIDE_SELECT_EVENT, type GuideCategory } from "@/lib/forms";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  // "#id" di una sezione della stessa pagina
  href: `#${string}`;
  // se c'è, il modulo della guida preseleziona questa categoria
  category?: GuideCategory;
  className?: string;
  children: ReactNode;
};

// Link a una sezione della pagina con scorrimento morbido (fermo con meno
// movimento). Senza JS resta un normale link con l'ancora.
export default function ScrollLink({ href, category, className, children }: Props) {
  const reducedMotion = useReducedMotion();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    if (category) {
      window.dispatchEvent(
        new CustomEvent(GUIDE_SELECT_EVENT, { detail: category })
      );
    }
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    // il fuoco segue lo scorrimento, per chi naviga da tastiera
    target.focus({ preventScroll: true });
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
