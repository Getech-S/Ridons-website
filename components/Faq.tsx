"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { FAQS, MORE_FAQS } from "@/lib/faqs";
import styles from "./Faq.module.css";



function Item({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const id = useId();
  return (
    <div
      className={`${styles.item} ${open ? styles.open : ""}`}
      data-reveal="up"
      style={
        { "--reveal-delay": `${(index % FAQS.length) * 80}ms` } as CSSProperties
      }
    >
      <h3>
        <button
          type="button"
          className={styles.summary}
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          <span className={styles.question}>{q}</span>
          <span className={styles.icon} aria-hidden="true">
            <Image src="/images/faq-plus.svg" alt="" width={14} height={14} />
          </span>
        </button>
      </h3>
      <div id={id} className={styles.panel} role="region" aria-hidden={!open}>
        <div className={styles.panelInner}>
          <p className={styles.answer}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? [...FAQS, ...MORE_FAQS] : FAQS;

  return (
    <section className={styles.section} id="faqs">
      <h2 className={styles.title} data-reveal="blur">
        Common questions
      </h2>

      <div className={styles.list}>
        {list.map((f, i) => (
          <Item
            key={f.q}
            q={f.q}
            a={f.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            index={i}
          />
        ))}
      </div>

      <button
        type="button"
        className={styles.more}
        onClick={() => setShowAll((v) => !v)}
        aria-expanded={showAll}
      >
        {showAll
          ? "Show fewer questions"
          : "See all frequently asked questions"}
        <span
          className={`${styles.arrow} ${showAll ? styles.arrowUp : ""}`}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}
