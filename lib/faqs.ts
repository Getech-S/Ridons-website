export type Faq = { q: string; a: string };

/** Shown on the page and published to search engines as FAQ structured data. */
export const FAQS: Faq[] = [
  {
    q: "Do I have to negotiate every time?",
    a: "No. Tap Confirm to use the suggested price.",
  },
  {
    q: "Can I still pay with cash?",
    a: "Yes. Cash or MTN MoMo. You pay exactly what you agreed.",
  },
  {
    q: "Where does Ridons operate?",
    a: "We're live in Kigali: Kimihurura, Remera and Nyarutarama, with more areas coming.",
  },
  {
    q: "Is it faster than walking to the stage?",
    a: "Often. Your motari comes to you.",
  },
  {
    q: "How much of my fare does the rider keep?",
    a: "Most of it. Ridons takes a small fee on finished trips.",
  },
];

export const MORE_FAQS: Faq[] = [
  {
    q: "What if the motari asks for more?",
    a: "Don't pay it. The agreed price is final. Report it in the app.",
  },
  {
    q: "Can I choose my motari?",
    a: "Yes. You see every offer and pick the one you want.",
  },
  {
    q: "I'm a motari. Can I skip a trip?",
    a: "Anytime. Accept, counter or skip.",
  },
  {
    q: "Who owns the trip record?",
    a: "The person who did the work. They decide who sees it, and Ridons never sells individual data.",
  },
  {
    q: "I left something behind.",
    a: "Tell us in the app or email us. We'll contact your motari.",
  },
];

export const ALL_FAQS = [...FAQS, ...MORE_FAQS];
