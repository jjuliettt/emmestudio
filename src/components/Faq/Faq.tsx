import styles from "./Faq.module.css";

type Props = {
  items: { question: string; answer: string }[];
};

// Fisarmonica senza JS: <details> con lo stesso "name" si apre una domanda
// alla volta (Safari 17.2+, Chrome 120+; prima si possono aprire tutte)
export default function Faq({ items }: Props) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} name="faq" className={styles.item}>
          <summary className={styles.question}>
            {item.question}
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
