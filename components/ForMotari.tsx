import Image from "next/image";
import type { CSSProperties } from "react";
import StoreBadges from "./StoreBadges";
import styles from "./ForMotari.module.css";

export default function ForMotari() {
  return (
    <section className={styles.card} id="for-motari" data-reveal="card">
      <Image
        src="/images/motari.png"
        alt=""
        fill
        sizes="(max-width: 1440px) 100vw, 1420px"
        className={styles.photo}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.text}>
          <h2
            className={styles.title}
            data-reveal="left"
            style={{ "--reveal-delay": "300ms" } as CSSProperties}
          >
            Your bike. Your price. <br className={styles.br} />
            Your business.
          </h2>
          <p
            className={styles.lead}
            data-reveal="left"
            style={{ "--reveal-delay": "450ms" } as CSSProperties}
          >
            You know Kigali&apos;s streets better than anyone. On Ridons, you
            decide what every ride is worth.
          </p>
        </div>
        <StoreBadges
          variant="outline"
          className={styles.badges}
          revealDelay={600}
        />
      </div>
    </section>
  );
}
