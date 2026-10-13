import { useLayoutEffect, type RefObject } from "react";

type Measure = (el: HTMLElement) => {
  // misura del testo a dimensione piena (con --fit = 1)
  size: number;
  // spazio a disposizione
  room: number;
};

// Rimpicciolisce il testo in modo uniforme, solo quanto serve, finché sta
// nello spazio: scrive il fattore (≤ 1) nella variabile CSS --fit, che il
// font-size dell'elemento usa. Si ricalcola quando arrivano i font e quando
// cambia la finestra, così vale per qualunque font venga caricato.
export function useFitText(ref: RefObject<HTMLElement | null>, measure: Measure) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.setProperty("--fit", "1");
      const { size, room } = measure(el);
      // un filo di margine per gli arrotondamenti
      const scale = size > room ? Math.max(0.5, (room / size) * 0.99) : 1;
      el.style.setProperty("--fit", String(scale));
    };

    fit();
    document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", fit);
    window.addEventListener("resize", fit);
    return () => {
      document.fonts.removeEventListener("loadingdone", fit);
      window.removeEventListener("resize", fit);
    };
    // measure non cambia: è una funzione fissa definita nel componente
  }, [ref]);
}
