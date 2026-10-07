import Image from "next/image";
import StoreButton from "./comingSoon/StoreButton";
import styles from "./StoreBadges.module.css";

type Props = {
  /** "filled": navy tiles (hero). "outline": white border (motari section). */
  variant: "filled" | "outline";
  className?: string;
  /** Delay (ms) before the badges pop in when scrolled into view. */
  revealDelay?: number;
};

export default function StoreBadges({ variant, className, revealDelay = 0 }: Props) {
  return (
    <div className={`${styles.list} ${className ?? ""}`}>
      <span data-reveal="pop" style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}>
        <StoreButton store="google" className={`${styles.badge} ${styles[variant]} shine`}>
          <Image src="/images/google-play.svg" alt="" width={184} height={53} />
        </StoreButton>
      </span>
      <span data-reveal="pop" style={{ "--reveal-delay": `${revealDelay + 120}ms` } as React.CSSProperties}>
        <StoreButton store="apple" className={`${styles.badge} ${styles[variant]} shine`}>
          <Image src="/images/app-store.svg" alt="" width={184} height={53} />
        </StoreButton>
      </span>
    </div>
  );
}
