import Image from "next/image";
import StoreButton from "./comingSoon/StoreButton";
import styles from "./Footer.module.css";

// TODO: replace # with the real social profile links.
const SOCIALS = [
  { label: "Facebook", icon: "/images/social/facebook.svg", href: "#" },
  { label: "X (Twitter)", icon: "/images/social/x.svg", href: "#" },
  { label: "Instagram", icon: "/images/social/instagram.svg", href: "#" },
  { label: "LinkedIn", icon: "/images/social/linkedin.svg", href: "#" },
  { label: "TikTok", icon: "/images/social/tiktok.svg", href: "#" },
];

const LEGAL = [
  { label: "Terms and Conditions", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cookies", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer} data-reveal="up">
      <div className={styles.top}>
        <div className={styles.brand}>
          <a href="#top" aria-label="Ridons home">
            <Image src="/images/footer-logo.svg" alt="Ridons" width={108} height={27} className={styles.logo} />
          </a>
          <ul className={styles.socials}>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} className={styles.social}>
                  <Image src={s.icon} alt="" width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stores}>
          <StoreButton store="google" className={`${styles.store} shine`}>
            <Image src="/images/google-play-outline.svg" alt="" width={139.917} height={40.466} />
          </StoreButton>
          <StoreButton store="apple" className={`${styles.store} shine`}>
            <Image src="/images/app-store-outline.svg" alt="" width={139.917} height={40.269} />
          </StoreButton>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Ridons</p>
        <ul className={styles.legal}>
          {LEGAL.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
