import Image from "next/image";
import type { CSSProperties } from "react";
import ContactButton from "./contact/ContactButton";
import styles from "./Inclusion.module.css";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function Inclusion() {
  return (
    <section className={styles.card} id="about" data-reveal="card">
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.hook} data-reveal="pop" style={delay(250)}>
            Others sell rides. We build records.
          </p>
          <h2 className={styles.title} data-reveal="up" style={delay(380)}>
            Turning transport work into economic opportunity
          </h2>
          <p className={styles.lead} data-reveal="up" style={delay(500)}>
            Ridons turns everyday rides into a verified record that helps moto-taxi workers access savings,
            protection, finance, and productive assets.
          </p>
        </div>
        <span data-reveal="pop" style={delay(650)}>
          <ContactButton reason="Partnership" className={`${styles.button} shine`}>
            Partner with us
          </ContactButton>
        </span>
      </div>

      <div className={styles.mockup} data-reveal="rise" style={delay(450)}>
        <div className={styles.mockupImg} data-parallax="-0.03">
          <Image
            src="/images/app-mockup.png"
            alt="Ridons app screens: a matched motari, weekly earnings and the price estimate"
            fill
            sizes="(max-width: 760px) 92vw, 694px"
          />
        </div>
      </div>
    </section>
  );
}
