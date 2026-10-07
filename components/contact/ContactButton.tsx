"use client";

import type { ReactNode } from "react";
import type { Reason } from "@/lib/contact";
import { useContact } from "./ContactProvider";

type Props = { reason: Reason; className?: string; children: ReactNode };

/** Opens the contact pop-up with the reason pre-selected. */
export default function ContactButton({ reason, className, children }: Props) {
  const { openContact } = useContact();
  return (
    <button type="button" className={className} onClick={() => openContact(reason)} aria-haspopup="dialog">
      {children}
    </button>
  );
}
