import Image from "next/image";
import Phone, { PHONE_WIDTH } from "./phone/Phone";
import ScaleToFit from "./phone/ScaleToFit";
import { PriceSheet, RouteSheet } from "./phone/Sheets";
import StoreBadges from "./StoreBadges";
import styles from "./Hero.module.css";

// The two phones in Figma (309:188 and 309:293) are the 330px phone at these scales.
const BACK_SCALE = 307.77 / PHONE_WIDTH;
const FRONT_SCALE = 303.993 / PHONE_WIDTH;

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.wave} aria-hidden="true">
        <Image src="/images/hero-wave.svg" alt="" fill preload />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.kicker}>Moto-taxi rides in Kigali</p>
          <h1 className={styles.title}>
            <span className={styles.line}>Set your price.</span>
            <span className={styles.line}>
              Hop <span className={styles.soft}>on. Go.</span>
            </span>
          </h1>
          <p className={styles.lead}>
            Make an offer. A motari accepts. The price is locked, and your moto is on its way.
          </p>
          <div id="get-app" className={styles.badges}>
            <StoreBadges variant="filled" revealDelay={550} revealOn="load" />
          </div>
        </div>

        <div className={styles.phones} aria-hidden="true" inert data-parallax="-0.08">
          <ScaleToFit width={497} height={592}>
            <div className={styles.stage}>
              <div className={styles.backPhone} style={{ transform: `scale(${BACK_SCALE})` }}>
                <Phone mapTop={-51.47}>
                  <PriceSheet price={1900} />
                </Phone>
              </div>
              <div className={styles.frontPhone} style={{ transform: `scale(${FRONT_SCALE})` }}>
                <Phone mapTop={-26.92}>
                  <RouteSheet />
                </Phone>
              </div>
            </div>
          </ScaleToFit>
        </div>
      </div>
    </section>
  );
}
