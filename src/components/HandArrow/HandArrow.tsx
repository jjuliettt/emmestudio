type Props = {
  direction: "up" | "left" | "right";
  className?: string;
};

const ROTATION = { up: 0, right: 90, left: -90 };

// La freccia disegnata a mano del sito (asta un po' ondulata, punta aperta):
// la stessa del pulsante per tornare su e delle frecce tra le categorie,
// solo girata. Colore e spessore li decide chi la usa (stroke).
export default function HandArrow({ direction, className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g transform={`rotate(${ROTATION[direction]} 12 12)`}>
        <path d="M12.3 19.6c-.9-3.6.6-7.4-.3-14.4" />
        <path d="M7.4 9.7c1.9-1.2 3.4-2.8 4.6-4.5 1.2 1.6 2.8 3 4.9 4" />
      </g>
    </svg>
  );
}
