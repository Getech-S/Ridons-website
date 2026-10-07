"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Reason } from "@/lib/contact";
import ContactDialog from "./ContactDialog";

type ContactContextValue = { openContact: (reason?: Reason) => void };

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside <ContactProvider>");
  return ctx;
}

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; reason: Reason; key: number }>({
    open: false,
    reason: "General inquiry",
    key: 0,
  });

  const openContact = useCallback((reason: Reason = "General inquiry") => {
    setState((s) => ({ open: true, reason, key: s.open ? s.key : s.key + 1 }));
  }, []);

  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <ContactDialog key={state.key} open={state.open} initialReason={state.reason} onClose={close} />
    </ContactContext.Provider>
  );
}
