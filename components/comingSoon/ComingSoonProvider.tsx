"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ComingSoon.module.css";

export type Store = "google" | "apple";

const STORE_NAMES: Record<Store, string> = { google: "Google Play", apple: "the App Store" };

const ComingSoonContext = createContext<((store: Store) => void) | null>(null);

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) throw new Error("useComingSoon must be used inside <ComingSoonProvider>");
  return ctx;
}

export default function ComingSoonProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [store, setStore] = useState<Store | null>(null);

  const show = useCallback((s: Store) => setStore(s), []);
  const close = useCallback(() => setStore(null), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (store && !dialog.open) dialog.showModal();
    if (!store && dialog.open) dialog.close();
  }, [store]);

  return (
    <ComingSoonContext.Provider value={show}>
      {children}
      <dialog
        ref={ref}
        className={styles.dialog}
        aria-labelledby="coming-soon-title"
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className={styles.card} tabIndex={-1} autoFocus>
          <div className={styles.media}>
            <Image src="/images/app-preview.webp" alt="" width={1690} height={1602} sizes="230px" />
          </div>
          <div className={styles.body}>
            <p className={styles.kicker}>{store === "apple" ? "App Store" : "Google Play"}</p>
            <h2 id="coming-soon-title" className={styles.title}>
              Coming soon
            </h2>
            <p className={styles.text}>
              The Ridons app is almost ready. It will be on {store ? STORE_NAMES[store] : "the stores"} very soon.
            </p>
            <button type="button" className={`${styles.ok} shine`} onClick={close}>
              Got it
            </button>
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </ComingSoonContext.Provider>
  );
}
