"use client";

import type { ReactNode } from "react";
import { useComingSoon, type Store } from "./ComingSoonProvider";

type Props = { store: Store; className?: string; children: ReactNode };

/** App store badge. The app isn't published yet, so it shows a "Coming soon" pop-up. */
export default function StoreButton({ store, className, children }: Props) {
  const show = useComingSoon();
  return (
    <button
      type="button"
      className={className}
      onClick={() => show(store)}
      aria-haspopup="dialog"
      aria-label={store === "google" ? "Get it on Google Play" : "Download on the App Store"}
    >
      {children}
    </button>
  );
}
