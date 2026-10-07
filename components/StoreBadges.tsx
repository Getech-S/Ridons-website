import Image from "next/image";
import StoreButton from "./comingSoon/StoreButton";
import styles from "./StoreBadges.module.css";

type Props = {
  /** "filled": navy tiles (hero). "outline": white border (motari section). */
  variant: "filled" | "outline";
  className?: string;
  /** Delay (ms) before the badges pop in. */
  revealDelay?: number;
  /** "scroll": pop in when scrolled into view. "load": pop in as the page loads (above the fold). */
  revealOn?: "scroll" | "load";
};

export default function StoreBadges({ variant, className, revealDelay = 0, revealOn = "scroll" }: Props) {
  const wrap = (delay: number) =>
    revealOn === "load"
      ? { className: styles.popOnLoad, style: { animationDelay: `${delay}ms` } }
      : { "data-reveal": "pop", style: { "--reveal-delay": `${delay}ms` } as React.CSSProperties };

  return (
    <div className={`${styles.list} ${className ?? ""}`}>
      <span {...wrap(revealDelay)}>
        <StoreButton store="google" className={`${styles.badge} ${styles[variant]} shine`}>
          <Image src="/images/google-play.svg" alt="" width={184} height={53} />
        </StoreButton>
      </span>
      <span {...wrap(revealDelay + 120)}>
        <StoreButton store="apple" className={`${styles.badge} ${styles[variant]} shine`}>
          <Image src="/images/app-store.svg" alt="" width={184} height={53} />
        </StoreButton>
      </span>
    </div>
  );
}
