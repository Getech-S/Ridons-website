"use client";

import { useEffect, useState } from "react";
import Phone, { PHONE_HEIGHT, PHONE_WIDTH } from "./phone/Phone";
import ScaleToFit from "./phone/ScaleToFit";
import {
  DoneSheet,
  OffersSheet,
  PriceSheet,
  type Motari,
  type Offer,
} from "./phone/Sheets";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    title: "Set your price",
    text: "We suggest a fair one. Keep it or change it.",
  },
  { title: "Get offers", text: "Motari nearby accept or counter." },
  { title: "Pick your motari", text: "See name, photo and rating first." },
  {
    title: "Ride and pay",
    text: "They come to you. Pay exactly what you agreed.",
  },
];

const MOTARI: Motari[] = [
  {
    name: "Jean Bosco",
    initials: "JB",
    color: "#2f6fde",
    rating: "4.9",
    plate: "RF 482 C",
    eta: 2,
  },
  {
    name: "Eric N.",
    initials: "EN",
    color: "#c9822b",
    rating: "4.8",
    plate: "RAD 123 B",
    eta: 1,
  },
  {
    name: "Claudine U.",
    initials: "CU",
    color: "#7c5cbf",
    rating: "5.0",
    plate: "RC 907 A",
    eta: 3,
  },
];

const SUGGESTED_PRICE = 1900;
const MIN_PRICE = 500;
const MAX_PRICE = 6000;
const FIRST_OFFER_MS = 350;
const OFFER_GAP_MS = 450;

/** A fair offer gets accepted. A low one gets counter-offers. Eric is easier to please. */
function replyFrom(index: number, price: number) {
  if (price >= SUGGESTED_PRICE) return price;
  if (index === 1 && price >= 1600) return price;
  return Math.max(price + 100, [1900, 1800, 2000][index]);
}

type Phase = "price" | "offers" | "done";

export default function HowItWorks() {
  const [phase, setPhase] = useState<Phase>("price");
  const [price, setPrice] = useState(SUGGESTED_PRICE);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [chosen, setChosen] = useState<Offer | null>(null);

  // Nearby motari reply one after another once a price is sent.
  useEffect(() => {
    if (phase !== "offers") return;
    const timers = MOTARI.map((motari, i) =>
      setTimeout(
        () => {
          setOffers((prev) => [
            ...prev,
            { motari, amount: replyFrom(i, price) },
          ]);
        },
        FIRST_OFFER_MS + i * OFFER_GAP_MS,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, price]);

  const waiting = phase === "offers" && offers.length < MOTARI.length;
  const step = phase === "price" ? 1 : phase === "done" ? 4 : waiting ? 2 : 3;

  const sendPrice = () => {
    setOffers([]);
    setPhase("offers");
  };

  const pick = (offer: Offer) => {
    setChosen(offer);
    setPhase("done");
  };

  const restart = () => {
    setPrice(SUGGESTED_PRICE);
    setOffers([]);
    setChosen(null);
    setPhase("price");
  };

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.head}>
        <h2 className={styles.title} data-reveal="blur">
          In-person bargaining, upgraded.
        </h2>
        <p
          className={styles.sub}
          data-reveal="blur"
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          Four simple steps. Try them on the phone.
        </p>
      </div>

      <div className={styles.body}>
        <ol
          className={styles.steps}
          style={
            {
              "--progress": (step - 1) / (STEPS.length - 1),
            } as React.CSSProperties
          }
        >
          {STEPS.map((s, i) => {
            const n = i + 1;
            const state =
              n === step ? styles.current : n < step ? styles.past : "";
            return (
              <li
                key={s.title}
                className={`${styles.step} ${state}`}
                aria-current={n === step ? "step" : undefined}
                data-reveal="left"
                style={
                  { "--reveal-delay": `${i * 120}ms` } as React.CSSProperties
                }
              >
                <span className={styles.num}>{n}</span>
                <div className={styles.stepText}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className={styles.mobileSteps} data-reveal="up">
          <div className={styles.bars} aria-hidden="true">
            {STEPS.map((s, i) => (
              <span
                key={s.title}
                className={i + 1 <= step ? styles.barOn : undefined}
              />
            ))}
          </div>
          <p className={styles.mobileLabel}>
            Step {step} of {STEPS.length}
          </p>
          <p className={styles.mobileTitle}>{STEPS[step - 1].title}</p>
          <p className={styles.mobileText}>{STEPS[step - 1].text}</p>
        </div>

        <div
          className={styles.demo}
          data-reveal="tilt"
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          <ScaleToFit width={PHONE_WIDTH} height={PHONE_HEIGHT}>
            <Phone sheetLabel="Ridons booking demo">
              {phase === "price" && (
                <PriceSheet
                  price={price}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  onChange={(d) =>
                    setPrice((p) =>
                      Math.min(MAX_PRICE, Math.max(MIN_PRICE, p + d)),
                    )
                  }
                  onConfirm={sendPrice}
                />
              )}
              {phase === "offers" && (
                <OffersSheet
                  price={price}
                  offers={offers}
                  waiting={waiting}
                  onPick={pick}
                  onBack={() => setPhase("price")}
                />
              )}
              {phase === "done" && chosen && (
                <DoneSheet offer={chosen} onRestart={restart} />
              )}
            </Phone>
          </ScaleToFit>
        </div>
      </div>
    </section>
  );
}
