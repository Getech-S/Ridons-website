import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./Phone.module.css";

/** Design size of the phone mockup (Figma node 309:406). */
export const PHONE_WIDTH = 330;
export const PHONE_HEIGHT = 583.759;

const MAP_LABELS = [
  { text: "KAGUGU", top: "30.01%", left: "20.95%" },
  { text: "GACURIRO", top: "51.93%", left: "55.02%" },
  { text: "NYARUTARAMA", top: "82.07%", left: "3.54%" },
  { text: "GASANZE", top: "25.9%", left: "58.8%" },
];

const TABS = [
  { label: "Home", icon: "/images/phone/home.svg", active: true },
  { label: "Activities", icon: "/images/phone/cal.svg" },
  { label: "Account", icon: "/images/phone/acc.svg" },
];

type Props = {
  /** Vertical offset of the map, so each screen can frame the route differently. */
  mapTop?: number;
  /** Contents of the bottom sheet ("drawer") above the tab bar. */
  children: ReactNode;
  sheetLabel?: string;
};

function Layer({ src, className }: { src: string; className: string }) {
  return (
    <div className={className}>
      <Image src={src} alt="" fill />
    </div>
  );
}

export default function Phone({ mapTop = -64.17, children, sheetLabel }: Props) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <div className={styles.mapWrap} style={{ top: mapTop }} aria-hidden="true">
          <div className={styles.map}>
            <Layer src="/images/phone/map-v0.svg" className={styles.v0} />
            <Layer src="/images/phone/map-v1.svg" className={styles.v1} />
            <Layer src="/images/phone/map-v2.svg" className={styles.v2} />
            <div className={styles.group}>
              <Layer src="/images/phone/map-group.svg" className={styles.groupInner} />
            </div>
            {MAP_LABELS.map((l) => (
              <span key={l.text} className={styles.mapLabel} style={{ top: l.top, left: l.left }}>
                {l.text}
              </span>
            ))}
            <div className={styles.v3}>
              <Layer src="/images/phone/map-v3.svg" className={styles.v3Inner} />
            </div>
            <div className={styles.v4}>
              <Layer src="/images/phone/map-v4.svg" className={styles.v4Inner} />
            </div>
            <div className={styles.v5}>
              <Layer src="/images/phone/map-v5.svg" className={styles.v5Inner} />
            </div>
            <Layer src="/images/phone/map-v6.svg" className={styles.v6} />
          </div>
        </div>

        <section className={styles.sheet} aria-label={sheetLabel} aria-live="polite">
          <div className={styles.sheetInner}>{children}</div>
        </section>

        <div className={styles.bottom} aria-hidden="true">
          <div className={styles.tabbar}>
            {TABS.map((t) => (
              <div key={t.label} className={`${styles.tab} ${t.active ? styles.tabActive : ""}`}>
                <Image src={t.icon} alt="" width={18.58} height={18.58} />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.gesture}>
            <span />
          </div>
        </div>

        <div className={styles.status} aria-hidden="true">
          <span className={styles.time}>9:41</span>
          <Image src="/images/phone/status.svg" alt="" width={44.415} height={7.019} />
        </div>

        <div className={styles.topMenu} aria-hidden="true">
          <div className={styles.topPill}>
            <Image src="/images/phone/menu.svg" alt="" width={9.909} height={9.909} />
            <div className={styles.topRoute}>
              <span className={styles.from}>Nyarutarama</span>
              <Image src="/images/phone/arrow.svg" alt="" width={14.864} height={14.864} />
              <span>Remera Bus Park</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.frame} aria-hidden="true">
        <Image src="/images/phone/frame.png" alt="" fill sizes="320px" loading="eager" />
      </div>
    </div>
  );
}
