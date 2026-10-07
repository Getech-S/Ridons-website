import Image from "next/image";
import styles from "./Sheets.module.css";

export const formatRwf = (n: number) => n.toLocaleString("en-US");

export function Stops() {
  return (
    <div className={styles.stops}>
      <div className={`${styles.stop} ${styles.stopFrom}`}>
        <Image src="/images/phone/loc-person.svg" alt="" width={14.864} height={14.864} />
        <span>Nyarutarama</span>
      </div>
      <div className={styles.stop}>
        <Image src="/images/phone/loc-pin.svg" alt="" width={14.864} height={14.864} />
        <span>Remera Bus Park</span>
      </div>
    </div>
  );
}

function SheetHead({ title, meta, sub }: { title: string; meta: string; sub: string }) {
  return (
    <div className={styles.headGroup}>
      <div className={styles.headText}>
        <div className={styles.headRow}>
          <h4 className={styles.title}>{title}</h4>
          <span className={styles.meta}>{meta}</span>
        </div>
        <p className={styles.sub}>{sub}</p>
      </div>
      <div className={styles.line}>
        <span />
      </div>
    </div>
  );
}

type PriceSheetProps = {
  price: number;
  onChange?: (delta: number) => void;
  onConfirm?: () => void;
  min?: number;
  max?: number;
};

/** "Price estimation" sheet (Figma 309:426). */
export function PriceSheet({ price, onChange, onConfirm, min, max }: PriceSheetProps) {
  return (
    <div className={styles.stack}>
      <SheetHead title="Price estimation" meta="1:30" sub="Market Fair price for this route." />
      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.stepBtn}
          onClick={onChange && (() => onChange(-100))}
          disabled={min !== undefined && price <= min}
          aria-label="Lower price by 100 RWF"
        >
          −
        </button>
        <output className={styles.amount} aria-label={`${formatRwf(price)} Rwandan francs`}>
          <span className={styles.amountNum}>{formatRwf(price)}</span>
          <span className={styles.amountCur}>RWF</span>
        </output>
        <button
          type="button"
          className={styles.stepBtn}
          onClick={onChange && (() => onChange(100))}
          disabled={max !== undefined && price >= max}
          aria-label="Raise price by 100 RWF"
        >
          +
        </button>
      </div>
      <button type="button" className={styles.primaryBtn} onClick={onConfirm}>
        Confirm
      </button>
      <div className={styles.stopsWrap}>
        <Stops />
      </div>
    </div>
  );
}

/** "Route" sheet shown on the front phone in the hero (Figma 309:313). */
export function RouteSheet() {
  return (
    <div className={styles.route}>
      <h4 className={styles.routeTitle}>Route</h4>
      <div className={styles.routeGroup}>
        <div className={styles.fields}>
          <div className={`${styles.field} ${styles.fieldActive}`}>
            <div className={styles.fieldText}>
              <Image src="/images/phone/search.svg" alt="" width={17.296} height={17.296} />
              <span>My current location</span>
            </div>
            <div className={styles.mapIcon}>
              <span className={styles.mapIconA} />
              <span className={styles.mapIconB} />
              <div className={styles.mapIconPin}>
                <Image src="/images/phone/input-icon.svg" alt="" fill />
              </div>
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldText}>
              <Image src="/images/phone/search-muted.svg" alt="" width={17.296} height={17.296} />
              <span>Choose dropoff location</span>
            </div>
          </div>
        </div>
        <span className={`${styles.primaryBtn} ${styles.routeBtn}`}>Continue</span>
      </div>
    </div>
  );
}

export type Motari = {
  name: string;
  initials: string;
  color: string;
  rating: string;
  plate: string;
  eta: number;
};

export type Offer = { motari: Motari; amount: number };

type OffersSheetProps = {
  price: number;
  offers: Offer[];
  waiting: boolean;
  onPick: (offer: Offer) => void;
  onBack: () => void;
};

export function OffersSheet({ price, offers, waiting, onPick, onBack }: OffersSheetProps) {
  return (
    <div className={styles.stack}>
      <SheetHead
        title="Offers for you"
        meta={`You offered ${formatRwf(price)}`}
        sub="Tap the motari you want."
      />
      <ul className={styles.offers}>
        {offers.map((o) => {
          const accepted = o.amount === price;
          return (
            <li key={o.motari.name} className={styles.offerItem}>
              <button type="button" className={styles.offer} onClick={() => onPick(o)}>
                <span className={styles.avatar} style={{ background: o.motari.color }}>
                  {o.motari.initials}
                </span>
                <span className={styles.who}>
                  <b>{o.motari.name}</b>
                  <small>
                    ★ {o.motari.rating} · {o.motari.eta} min away
                  </small>
                </span>
                <span className={styles.offerAmt}>
                  <b>{formatRwf(o.amount)}</b>
                  <small className={accepted ? styles.accepted : styles.counter}>
                    {accepted ? "Accepted" : "Counter-offer"}
                  </small>
                </span>
              </button>
            </li>
          );
        })}
        {waiting && (
          <li className={styles.waiting}>
            <span className={styles.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Finding motari nearby
          </li>
        )}
      </ul>
      <button type="button" className={styles.ghostBtn} onClick={onBack}>
        Change my price
      </button>
    </div>
  );
}

export function DoneSheet({ offer, onRestart }: { offer: Offer; onRestart: () => void }) {
  return (
    <div className={styles.stack}>
      <div className={styles.done}>
        <span className={styles.tick} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <b className={styles.doneTitle}>Price agreed: {formatRwf(offer.amount)} RWF</b>
        <p className={styles.doneText}>
          {offer.motari.name} is on the way, {offer.motari.eta} min.
          <br />
          Plate {offer.motari.plate}. This price won&apos;t change.
        </p>
      </div>
      <Stops />
      <button type="button" className={styles.primaryBtn} onClick={onRestart}>
        Try again
      </button>
    </div>
  );
}
