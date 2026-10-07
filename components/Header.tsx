"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "For motari", href: "#for-motari" },
  { label: "FAQs", href: "#faqs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${open ? styles.open : ""} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav} aria-label="Main">
        <a href="#top" className={styles.logo} aria-label="Ridons home">
          <Image src="/images/logo.svg" alt="Ridons" width={128} height={32} preload />
        </a>

        <ul className={styles.links} id="main-menu">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          {/* Phones: the app button lives inside the menu instead of the bar */}
          <li className={styles.menuCtaItem}>
            <a href="#get-app" className={`${styles.menuCta} shine`} onClick={() => setOpen(false)}>
              Get the App
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <a href="#get-app" className={`${styles.cta} shine`}>
            Get the App
          </a>
          <button type="button" className={styles.lang} aria-label="Change language (English)">
            <Image src="/images/globe.svg" alt="" width={20} height={20} loading="eager" />
            <span>en</span>
          </button>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <span className={styles.progress} aria-hidden="true" />
      </nav>
    </header>
  );
}
