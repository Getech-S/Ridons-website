import { ALL_FAQS } from "@/lib/faqs";
import { SITE, SITE_URL } from "@/lib/site";

/** schema.org data that tells search engines what Ridons is, where it operates and how it works. */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-512.png`, width: 512, height: 512 },
      email: SITE.email,
      slogan: SITE.tagline,
      description: SITE.description,
      areaServed: { "@type": "City", name: SITE.city, containedInPlace: { "@type": "Country", name: SITE.country } },
      address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: SITE.countryCode },
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: SITE.email, areaServed: SITE.countryCode }],
      ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "TaxiService",
      "@id": `${SITE_URL}/#service`,
      name: "Ridons moto-taxi rides",
      serviceType: "Moto-taxi (motorcycle taxi) ride hailing",
      description:
        "Book a moto-taxi in Kigali by setting your own price. Nearby motari accept or counter, you pick your rider, and the fare is locked in. Pay with cash or MTN MoMo.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: SITE.city, containedInPlace: { "@type": "Country", name: SITE.country } },
      availableChannel: { "@type": "ServiceChannel", serviceUrl: SITE_URL },
      url: SITE_URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: ALL_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
