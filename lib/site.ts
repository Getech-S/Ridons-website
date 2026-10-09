/** Site-wide facts used for SEO metadata, structured data, sitemap and manifest. */

// Production address. Override with NEXT_PUBLIC_SITE_URL if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ridons.com").replace(/\/$/, "");

export const SITE = {
  name: "Ridons",
  legalName: "Ridons",
  title: "Ridons: Moto-taxi rides in Kigali at the price you set",
  shortTitle: "Ridons",
  description:
    "Ridons is the moto-taxi app for Kigali, Rwanda. Set your price, get offers from nearby motari and ride at a fare that's locked in. Cash or MTN MoMo.",
  tagline: "Set your price. Hop on. Go.",
  email: "ridonsrw@gmail.com",
  city: "Kigali",
  country: "Rwanda",
  countryCode: "RW",
  locale: "en_RW",
  themeColor: "#c91d22",
  keywords: [
    "Ridons",
    "moto taxi Kigali",
    "moto Kigali",
    "motari",
    "moto taxi app",
    "moto taxi Rwanda",
    "taxi moto Kigali",
    "ride hailing Kigali",
    "ride hailing Rwanda",
    "transport Kigali",
    "transport app Rwanda",
    "boda boda Kigali",
    "motorbike taxi Kigali",
    "book a moto Kigali",
    "cheap moto Kigali",
    "set your own fare",
    "moto rider earnings",
    "MTN MoMo ride payment",
  ],
  // TODO: add the real profile URLs (they also strengthen the brand in Google).
  sameAs: [] as string[],
};
