import Image from "next/image";
import type { CSSProperties } from "react";
import ContactButton from "./contact/ContactButton";
import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.card} data-reveal="up">
        <div className={styles.shape} aria-hidden="true">
          <Image src="/images/cta-shape.png" alt="" fill sizes="500px" />
        </div>

        <div className={styles.figure} aria-hidden="true">
          <div className={styles.woman}>
            {/* Rises up from behind the card's bottom edge */}
            <div
              className={styles.womanImg}
              data-reveal="rise"
              style={{ "--reveal-delay": "250ms" } as CSSProperties}
            >
              <Image
                src="/images/cta-woman.png"
                alt=""
                fill
                sizes="(max-width: 900px) 1000px, 1620px"
              />
            </div>
          </div>
        </div>

        <div
          className={styles.text}
          data-reveal="left"
          style={{ "--reveal-delay": "400ms" } as CSSProperties}
        >
          <h2 className={styles.title}>
            Let&apos;s move Kigali <br />
            forward, together.
          </h2>
          <p className={styles.lead}>Talk to the Ridons team.</p>
        </div>

        <div
          className={styles.action}
          data-reveal="pop"
          style={{ "--reveal-delay": "600ms" } as CSSProperties}
        >
          <ContactButton
            reason="General inquiry"
            className={`${styles.email} shine`}
          >
            Contact us
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
